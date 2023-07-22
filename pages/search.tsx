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
  credits: number | null;
};

export default function Search() {
  const [results, setResults] = useState<Data>({ text: "" });
  const [loading, setloading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [userData, setuserData] = useState<UserDataType>({ credits: null });
  const auth_ = useAuth();
  const navigate = useRouter();

  useEffect(() => {
    if (userData?.credits === null && auth_.user) {
      getDoc(doc(db, `users/${auth_.user!.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.data().credits === 0)
              toast.error("You are out of credits.");
            setuserData({
              credits: snapshot.data().credits,
            });
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch your credits.");
          console.error(`${(error as Error).message}`);
        });
    }

    if (
      userData?.credits !== null &&
      userData?.credits >= 1 &&
      userData?.credits <= 3
    ) {
      toast("You are running low on credits", { icon: "⚠️" });
    }
  }, [auth_.user, userData]);

  useEffect(() => {
    const { story } = navigate.query;
    if (query === "" && story) {
      getDoc(doc(db, `users/${auth_.user?.uid}/history/${story}`))
        .then((docSnapshot) => {
          setQuery(docSnapshot.data()?.story);
        })
        .catch((error) => {
          console.error((error as Error).message);
        });
    }
  }, [query, auth_.user?.uid, navigate.query]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) {
      toast("Nothing has been typed.", { icon: "🤷🏾" });
      return;
    }

    if (userData.credits === 0) {
      toast.error("You are out of credits. please pay.", {
        duration: 6000,
      });
      return;
    }
    setloading(true);
    let bodyData = {
      query,
      storyId: navigate.query["story"] || false,
    };
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await auth_.user?.getIdToken()}`,
        },
        body: JSON.stringify(bodyData),
      });
      if (response.status === 200) {
        const results = (await response.json()) as Data;
        setResults(results);
        setQuery("");
        setuserData({ credits: null });
        setloading(false);
        navigate.replace(navigate.asPath.split("?")[0]);
      } else if (response.status === 400) {
        setloading(false);
        toast.error("Failed to get the bible verse.");
      } else {
        setloading(false);
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setloading(false);
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const withGoogle = async () => {
    try {
      setloading(true);
      google_provider.setCustomParameters({ prompt: "select_account" });
      const user = await signInWithPopup(auth, google_provider);
      setloading(false);
      toast.success(`Welcome, ${user.user.displayName}`);
      getDoc(doc(db, `users/${user.user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setuserData({
            credits: snapshot.data().credits,
          });
        } else {
          setDoc(doc(db, `users/${user.user.uid}`), {
            credits: 10,
          });
          setuserData({
            credits: 10,
          });
        }
      });
    } catch (error) {
      setloading(false);
      console.error((error as Error).message);
    }
  };

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };

    const colorSchemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    colorSchemeMediaQuery.addEventListener("change", handleColorSchemeChange);

    return () => {
      colorSchemeMediaQuery.removeEventListener(
        "change",
        handleColorSchemeChange
      );
    };
  }, []);

  const logoSrc = isDarkTheme
    ? "/images/logo/brand-logo-light.svg"
    : "/images/logo/brand-logo.svg";

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Search | Discover the Bible in a whole new way</title>
      </Head>
      {auth_.user ? (
        <>
          <Header />
          <div className="flex flex-col justify-center px-4 py-16 mx-auto my-auto space-y-2 md:py-32 md:mx-auto md:space-y-10 max-w-7xl sm:px-6 lg:px-8">
            <h1 className="mb-8 text-xl font-bold text-center md:text-3xl">
              Describe a small story, parable or event in the&nbsp;
              <span className="dark:text-azure-300 text-azure-400">Bible</span>.
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              <textarea
                name="query"
                rows={5}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type here..."
                className={`w-full p-2.5 text-sm md:text-base bg-azure-100/50 text-azure-900 dark:text-azure-200 dark:bg-azure-950 rounded-2xl outline-none ${
                  userData.credits !== null
                    ? userData.credits === 0
                      ? "ring-4 ring-red-700"
                      : userData.credits <= 3
                      ? "ring-4 ring-yellow-500"
                      : "ring-4 ring-green-700"
                    : "ring-4 ring-azure-800"
                }`}
              />
              <div className="flex items-center justify-end mt-2">
                <Popover
                  content={
                    <div className="flex flex-col items-center justify-center p-4 space-y-2 dark:text-azure-800 text-azure-50">
                      <h3 className="font-bold">How to pay</h3>
                      <p className="text-sm text-justify">
                        We currently don&apos;t support online payment, you can
                        contact me through&nbsp;{" "}
                        <Link
                          className="underline"
                          href="mailto:mkumboelia@gmail.com"
                        >
                          my email
                        </Link>
                      </p>
                    </div>
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-info-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </Popover>
                <p className="ml-3 text-sm text-azure-500 md:text-base">
                  Quota remaining: {userData?.credits}
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading && "opacity-30"
                } block px-7 py-2 md:px-9 mx-auto mt-10 border rounded w-fit`}
              >
                Search
              </button>
            </form>
            <div className="mt-10 text-center">
              {loading ? (
                <div>
                  <Ellipsis />
                </div>
              ) : (
                <>
                  {results.scripture && (
                    <div className="px-10 py-2 mx-auto border-2 rounded-md border-azure-600 w-fit">
                      <p>
                        <span className="font-bold">Story: </span>
                        {results.story}
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          results.scripture.trim() !== "not found"
                            ? "border-b-4"
                            : "border-t-2"
                        }`}
                      >
                        {results.scripture}
                      </p>
                      <p className="my-5 text-xl">{results.scriptureText}</p>
                    </div>
                  )}
                </>
              )}
              <Link
                href="/history"
                className={`${
                  results.scriptureText && "mt-5"
                } block w-fit mx-auto hover:border rounded px-5 py-2`}
              >
                View History
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex container mx-auto px-8 sm:px-32 lg:px-64 xl:px-0 flex-row md:flex-col py-16 my-auto space-y-2 md:space-y-10">
          <div className="flex bg-azure-100 items-center text-center dark:bg-azure-950 backdrop-blur-md rounded-3xl w-full xl:w-5/12 flex-col px-8 py-20 lg:py-24 my-auto gap-4 sm:px-14 lg:px-20">
            <div className="flex-shrink-0 mb-4">
              <Link href="/" className="text-xl font-bold">
                <Image
                  className="w-28"
                  src={logoSrc}
                  width={500}
                  height={500}
                  alt="Find Bible Scripture"
                />
              </Link>
            </div>
            <h3 className="text-xl font-bold md:text-2xl lg:text-2xl">
              Have a story in mind and would you like to know which&nbsp;
              <span className="dark:text-azure-300 text-azure-400">
                Bible Scripture
              </span>
              &nbsp;relates to it?
            </h3>
            <div className="max-w-2xl text-md px-4 md:max-w-lg">
              Join us and receive a collection of&nbsp;
              <span className="font-bold dark:text-azure-300 text-azure-400">
                10 free
              </span>
              &nbsp;stories to explore their corresponding Bible Scriptures.
              Gain insight into the Word of God through your cherished
              narratives.
            </div>
            {loading ? (
              <Ellipsis />
            ) : (
              <button
                onClick={() => withGoogle()}
                className="flex items-center mt-4 px-6 py-3 space-x-2 font-semibold rounded-lg w-fit dark:bg-azure-50 bg-azure-950 dark:text-azure-800 text-azure-50"
              >
                <span>Continue with</span>
                <Image
                  src="/google.png"
                  width={20}
                  height={20}
                  alt="google's logo"
                />
              </button>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
