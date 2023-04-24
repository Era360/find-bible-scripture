import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

// Local imports
import { useAuth } from "@/utils/use-auth";
import { auth, db, google_provider } from "@/firebase";
import Ellipsis from "@/components/ellipsis/ellipsis";
import Avatar from "@/components/avatar/avatar";

type ResultDataType = {
    text: string
}

type UserDataType = {
    credits: number | null
}

// const sampleData: Array<ResultDataType> = [
//     {
//         id: 1,
//         text: "this is cool"
//     },
//     {
//         id: 2,
//         text: "this is cool"
//     },
//     {
//         id: 3,
//         text: "this is cool"
//     },
//     {
//         id: 4,
//         text: "this is cool"
//     },
//     {
//         id: 5,
//         text: "this is cool"
//     },
//     {
//         id: 6,
//         text: "this is cool"
//     }
// ]

export default function Search() {
    const [results, setResults] = useState<ResultDataType>({ text: "" });
    const [loading, setloading] = useState<boolean>(false)
    const [query, setQuery] = useState("");
    const [userData, setuserData] = useState<UserDataType>({ credits: null })
    const auth_ = useAuth()

    useEffect(() => {
        if (userData?.credits === null && auth_.user) {
            getDoc(doc(db, `users/${auth_.user!.uid}`))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        if (snapshot.data().credits === 0) toast.error("You are out of credits.")
                        setuserData({
                            credits: snapshot.data().credits
                        })
                    }
                })
                .catch(error => {
                    toast.error("Failed to fetch your credits.")
                    console.error(`${(error as Error).message}`)
                })
        }

    }, [auth_.user, userData])


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!query) { toast("Nothing has been typed.", { icon: "🤷🏾" }); return }

        if (userData.credits === 0) {
            toast.error("You are out of credits. please pay.", {
                duration: 6000
            })
            return
        }
        setloading(true)
        try {
            const response = await fetch("/api/search",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await auth_.user?.getIdToken()}`
                    },
                    body: JSON.stringify({
                        query
                    })
                });
            const results = await response.json() as { text: string };
            console.log(results)
            setResults(results);
            setuserData({ credits: null })
            setloading(false)
        } catch (error) {
            setloading(false)
            console.error(error);
            toast.error("Something went wrong. Please try again later.")
        }
    };

    const withGoogle = async () => {
        try {
            setloading(true);
            google_provider.setCustomParameters({ prompt: "select_account" });
            const user = await signInWithPopup(auth, google_provider);
            setloading(false)
            toast.success(`Welcome, ${user.user.displayName}`)
            getDoc(doc(db, `users/${user.user.uid}`))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        setuserData({
                            credits: snapshot.data().credits
                        })
                    } else {
                        setDoc(doc(db, `users/${user.user.uid}`), {
                            credits: 3
                        })
                        setuserData({
                            credits: 3
                        })
                    }
                })

        } catch (error) {
            setloading(false);
            const error_message = (error as Error).message;
            console.log(error_message)
        }
    };

    return (
        <div className="min-h-screen">
            <Head>
                <title>Search | Discover the Bible in a whole new way</title>
            </Head>
            <nav className="mx-2 border-b-2 border-gray-300 sm:mx-10">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl font-bold">
                                find bible scripture
                            </Link>
                        </div>
                        <div className='hidden sm:block'>
                            {
                                auth_.user ? <div className="flex items-center space-x-4">
                                    <p className="font-medium">{auth_.user.displayName}</p>
                                    <div className="cursor-pointer" onClick={() => signOut(auth)}>
                                        <Avatar user_image={auth_.user.photoURL} />
                                    </div>
                                </div>
                                    :
                                    <Link href="/search" className="p-2 text-lg font-medium bg-gray-700 rounded-md hover:bg-gray-600">
                                        Sign Up
                                    </Link>
                            }
                        </div>
                        <div className="flex -mr-2 sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                                aria-label="Main menu"
                                aria-expanded="false"
                            >
                                <svg className="block w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Toaster />
            {
                auth_.user ?
                    <div className="px-4 py-20 sm:px-6 lg:px-8">
                        <h1 className="mb-8 text-3xl font-bold text-center">Describe a small story, parable or event in the Bible.</h1>
                        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                            <textarea
                                name="query"
                                rows={5}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Type here..."
                                className={`w-full px-3 py-2 text-gray-800 border-gray-300 rounded-md outline-none ${userData.credits === 0 ? "ring-4 ring-red-700" : "ring-4 ring-green-700"}`}
                            />
                            <p className="text-gray-500 text-end">Quota remaining: {userData?.credits}</p>
                            <button type="submit" disabled={loading} className={`${loading && "opacity-30"} block py-2 mx-auto mt-10 border rounded w-fit px-9`}>
                                Search
                            </button>
                        </form>
                        <div className="mt-10 text-center">
                            {
                                loading ?
                                    <div>
                                        <Ellipsis />
                                    </div> :
                                    <>
                                        {results.text && (
                                            <div className="px-10 py-2 mx-auto border-2 border-gray-600 rounded-md w-fit">
                                                <p>{query}</p>
                                                <p className="text-4xl font-semibold">{results.text}</p>
                                            </div>
                                        )}
                                    </>
                            }
                            <button className={`${results.text && "mt-5"} hover:border rounded px-5 py-2`}>View History</button>
                        </div>
                    </div> :
                    <div className="py-20 space-y-10">
                        <h3 className="max-w-4xl mx-auto mb-5 text-xl font-bold text-center text-gray-100 sm:text-3xl">
                            Have a story you remember and want to know what <span className="text-gray-600">Bible Scripture</span> it was?
                        </h3>
                        <div className="h-[250px] flex flex-col items-center space-y-10 max-w-[670px] mt-2 mx-auto">
                            <div className="max-w-xl text-lg text-gray-300">
                                Sign up to get <span className="font-bold text-blue-500">10 free</span> stories to ask.
                            </div>
                            {
                                loading ? <Ellipsis /> :
                                    <button
                                        onClick={() => withGoogle()}
                                        className="flex items-center px-6 py-3 space-x-2 font-semibold text-black bg-gray-200 rounded-2xl"
                                    >
                                        <Image
                                            src="/google.png"
                                            width={20}
                                            height={20}
                                            alt="google's logo"
                                        />
                                        <span>Sign in with Google</span>
                                    </button>
                            }
                        </div>
                    </div>
            }
        </div>
    );
}
