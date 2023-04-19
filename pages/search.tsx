import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

// Local imports
import { useAuth } from "@/utils/use-auth";
import { auth, google_provider } from "@/firebase";

type ResultDataType = {
    id: number,
    text: string
}

const sampleData: Array<ResultDataType> = [
    {
        id: 1,
        text: "this is cool"
    },
    {
        id: 2,
        text: "this is cool"
    },
    {
        id: 3,
        text: "this is cool"
    },
    {
        id: 4,
        text: "this is cool"
    },
    {
        id: 5,
        text: "this is cool"
    },
    {
        id: 6,
        text: "this is cool"
    }
]

export default function Search() {
    const [results, setResults] = useState<Array<ResultDataType>>(sampleData);
    const [loading, setloading] = useState(false)
    const [query, setQuery] = useState("");
    const navigate = useRouter()
    const auth_ = useAuth()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();
            console.log(results)
            // setResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const withGoogle = async () => {
        try {
            setloading(true);
            google_provider.setCustomParameters({ prompt: "select_account" });
            await signInWithPopup(auth, google_provider);
            //   navigate.push("/");
        } catch (error) {
            setloading(false);
            const error_message = (error as Error).message;
            console.log(error_message)
            //   seterror(error_message);
        }
    };

    return (
        <div className="min-h-screen">
            <Head>
                <title>Search | Discover the Bible in a whole new way</title>
            </Head>
            <nav className="mx-2 sm:mx-10 border-b-2 border-gray-300">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl font-bold">
                                find bible scripture
                            </Link>
                        </div>
                        <div className='hidden sm:block'>
                            <Link href="/search" className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-lg font-medium">
                                Sign Up
                            </Link>
                        </div>
                        <div className="-mr-2 flex sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                aria-label="Main menu"
                                aria-expanded="false"
                            >
                                <svg className="block h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {
                auth_.user ?
                    <div className="px-4 sm:px-6 lg:px-8 py-20">
                        <h1 className="text-3xl text-center font-bold mb-8">Describe a small story, parable or event in the Bible.</h1>
                        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                            <textarea
                                name="query"
                                rows={5}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Type here..."
                                className="py-2 px-3 rounded-md w-full text-gray-800 border-gray-300 outline-none"
                            />
                            <button type="submit" className="block border w-fit mx-auto mt-10 px-9 py-2 rounded">
                                Search
                            </button>
                        </form>
                        {/* {results.length > 0 && (
                    <div className="mt-2">
                        <p className="text-lg font-medium mb-4">Search results:</p>
                        <ul className="list-disc pl-8">
                            {results.map((result) => (
                                <li key={result.id} className="mb-2">
                                    <Link href={`/verses/${result.id}`} className="text-indigo-600 hover:text-indigo-900">
                                        {result.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
                    </div> :
                    <div className="py-20 space-y-10">
                        <h3 className="mx-auto text-center max-w-4xl text-xl font-bold  text-gray-100 sm:text-3xl mb-5">
                            Have a story you remember and want to know what <span className="text-gray-600">Bible Scripture</span> it was?
                        </h3>
                        <div className="h-[250px] flex flex-col items-center space-y-10 max-w-[670px] mt-2 mx-auto">
                            <div className="max-w-xl text-gray-300 text-lg">
                                Sign up to get free 3 stories to ask.
                            </div>
                            <button
                                onClick={() => withGoogle()}
                                className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                            >
                                <Image
                                    src="/google.png"
                                    width={20}
                                    height={20}
                                    alt="google's logo"
                                />
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
}
