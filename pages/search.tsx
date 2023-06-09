import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Local imports
import Header from "@/components/header";
import { useAuth } from "@/utils/use-auth";
import { auth, db, google_provider } from "@/firebase";
import Ellipsis from "@/components/ellipsis/ellipsis";
import { Data } from "./api/search";
import Footer from "@/components/footer";
import Popover from "@/components/popover";

type UserDataType = {
    credits: number | null
}


export default function Search() {
    const [results, setResults] = useState<Data>({ text: "" });
    const [loading, setloading] = useState<boolean>(false)
    const [query, setQuery] = useState("");
    const [userData, setuserData] = useState<UserDataType>({ credits: null })
    const auth_ = useAuth()
    const navigate = useRouter()

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

        if (userData?.credits !== null && userData?.credits >= 1 && userData?.credits <= 3) {
            toast("You are running low on credits", { icon: "⚠️" })
        }

    }, [auth_.user, userData])

    useEffect(() => {
        const { story } = navigate.query
        if (query === "" && story) {
            getDoc(doc(db, `users/${auth_.user?.uid}/history/${story}`))
                .then(docSnapshot => {
                    setQuery(docSnapshot.data()?.story)
                })
                .catch(error => {
                    console.error((error as Error).message)
                })
        }


    }, [query, auth_.user?.uid, navigate.query])

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
        let bodyData = {
            query,
            storyId: navigate.query["story"] || false,
        }
        try {
            const response = await fetch("/api/search",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await auth_.user?.getIdToken()}`
                    },
                    body: JSON.stringify(bodyData)
                });
            if (response.status === 200) {
                const results = await response.json() as Data;
                setResults(results);
                setQuery("")
                setuserData({ credits: null })
                setloading(false)
                navigate.replace(navigate.asPath.split("?")[0])
            } else if (response.status === 400) {
                setloading(false)
                toast.error("Failed to get the bible verse.")
            }
            else {
                setloading(false)
                toast.error("Something went wrong. Please try again later.")
            }
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
                            credits: 10
                        })
                        setuserData({
                            credits: 10
                        })
                    }
                })

        } catch (error) {
            setloading(false);
            console.error((error as Error).message)
        }
    };

    return (
        <div className="min-h-screen">
            <Head>
                <title>Search | Discover the Bible in a whole new way</title>
            </Head>
            <Header />
            {
                auth_.user ?
                    <div className="px-4 py-20 sm:px-6 lg:px-8">
                        <h1 className="mb-8 text-xl font-bold text-center md:text-3xl">Describe a small story, parable or event in the Bible.</h1>
                        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                            <textarea
                                name="query"
                                rows={5}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Type here..."
                                className={`w-full p-2.5 text-sm md:text-base text-gray-800 border-gray-300 rounded-md outline-none ${userData.credits !== null ?
                                    userData.credits === 0 ? "ring-4 ring-red-700" :
                                        userData.credits <= 3 ? "ring-4 ring-yellow-500" : "ring-4 ring-green-700" :
                                    "ring-4 ring-gray-800"
                                    }`}
                            />
                            <div className="flex items-center justify-end mt-2">
                                <Popover content={
                                    <div className="flex flex-col items-center justify-center p-4 space-y-2">
                                        <h3 className="font-bold text-gray-800">How to pay</h3>
                                        <p className="text-sm text-center text-gray-800">We currently don&apos;t support online payment, you can contact me through <Link className="text-blue-600 underline" href="mailto:mkumboelia@gmail.com">my email</Link></p>
                                    </div>
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </Popover>
                                <p className="ml-3 text-sm text-gray-500 md:text-base">Quota remaining: {userData?.credits}</p>
                            </div>
                            <button type="submit" disabled={loading} className={`${loading && "opacity-30"} block px-7 py-2 md:px-9 mx-auto mt-10 border rounded w-fit`}>
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
                                        {results.scripture && (
                                            <div className="px-10 py-2 mx-auto border-2 border-gray-600 rounded-md w-fit">
                                                <p><span className="font-bold">Story: </span>{results.story}</p>
                                                <p className={`text-lg font-bold ${results.scripture.trim() !== "not found" ? "border-b-4" : "border-t-2"}`}>{results.scripture}</p>
                                                <p className="my-5 text-xl">{results.scriptureText}</p>
                                            </div>
                                        )}
                                    </>
                            }
                            <Link href="/history" className={`${results.scriptureText && "mt-5"} block w-fit mx-auto hover:border rounded px-5 py-2`}>View History</Link>
                        </div>
                    </div> :
                    <div className="py-20 space-y-5 md:space-y-10">
                        <h3 className="max-w-4xl mx-auto mb-5 text-xl font-bold text-center text-gray-100 sm:text-3xl">
                            Have a story you remember and want to know what <span className="text-gray-600">Bible Scripture</span> it was?
                        </h3>
                        <div className="h-[250px] flex flex-col items-center space-y-4 md:space-y-10 max-w-[670px] mt-2 mx-auto">
                            <div className="max-w-xl text-lg text-gray-300">
                                Sign up to get <span className="font-bold text-blue-500">10 free</span> stories to ask.
                            </div>
                            {
                                loading ? <Ellipsis /> :
                                    <button
                                        onClick={() => withGoogle()}
                                        className="flex items-center px-5 py-2 space-x-2 font-semibold text-black bg-gray-200 md:px-6 md:py-3 rounded-2xl"
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
            <Toaster />
        </div>
    );
}
