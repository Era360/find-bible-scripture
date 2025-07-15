import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

// Local imports
import Header from "@/components/header";
import { useAuth } from "@/utils/use-auth";
import { auth, db, google_provider } from "@/firebase";
import { Data } from "./api/search";
import Ellipsis from "@/components/ellipsis/ellipsis";
import Link from "next/link";
import Image from "next/image";

interface HistoryData extends Data {
  id: string;
  chatId?: string;
}

type UserDataType = {
  credits: number | null;
};

function Search() {
  const [historyData, sethistoryData] = useState<Array<HistoryData>>([]);
  const [noData, setnoData] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [userData, setuserData] = useState<UserDataType>({ credits: null });
  const auth_ = useAuth();
  const navigate = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [historyData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Removed chat options and chats list click outside handlers
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkTheme(darkModeQuery.matches);

      const handleColorSchemeChange = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
      };

      darkModeQuery.addEventListener("change", handleColorSchemeChange);

      return () => {
        darkModeQuery.removeEventListener("change", handleColorSchemeChange);
      };
    }
  }, []);

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
          toast.error("Unable to fetch your credit information.");
          console.error(`${(error as Error).message}`);
        });
    }

    if (
      userData?.credits !== null &&
      userData?.credits >= 1 &&
      userData?.credits <= 3
    ) {
      toast("You're running low on credits", { icon: "⚠️" });
    }
  }, [auth_.user, userData]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (auth_.user) {
        const historyRef = collection(db, `users/${auth_.user.uid}/messages`);
        const q = query(historyRef, orderBy("time", "asc"));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setnoData(true);
        } else {
          let theData: HistoryData[] = [];
          querySnapshot.forEach((doc) => {
            theData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          sethistoryData(theData);
        }
      }
    };

    if (historyData.length == 0 && !noData) {
      fetchHistory();
    }
  }, [auth_.user, historyData.length, noData]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, google_provider);
      const userRef = doc(db, `users/${result.user.uid}`);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          credits: 10,
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
        });
        setuserData({ credits: 10 });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Unable to sign in with Google. Please try again.");
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      toast(
        "Please describe a biblical story or situation to search for verses.",
        { icon: "🤷🏾" }
      );
      return;
    }

    if (!auth_.user) {
      toast.error("Please sign in to search for Scripture verses.");
      return;
    }

    if (userData.credits === 0) {
      toast.error(
        "You're out of credits. Please contact support for assistance.",
        {
          duration: 6000,
        }
      );
      return;
    }

    if (searchQuery.length < 50) {
      toast(
        "The more detailed your description, the better the search results.",
        {
          icon: "🛈",
          duration: 6000,
        }
      );
    }

    setSearchLoading(true);
    try {
      // Get the user's ID token for authentication
      const idToken = await auth_.user?.getIdToken();

      if (!idToken) {
        throw new Error("Authentication failed. Please sign in again.");
      }

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          query: searchQuery,
          storyId: false,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error("Authentication failed. Please sign in again.");
        } else if (response.status === 500) {
          throw new Error(data.error || data.text || "Server error occurred");
        } else {
          throw new Error(data.error || data.text || "Failed to search");
        }
      }

      // Save to Firebase
      if (auth_.user) {
        const messageRef = collection(db, `users/${auth_.user.uid}/messages`);
        await addDoc(messageRef, {
          story: searchQuery,
          scripture: data.scripture,
          scriptureText: data.scriptureText,
          time: new Date(),
        });
      }

      // Update local state
      const newHistoryItem = {
        id: Date.now().toString(),
        story: searchQuery,
        scripture: data.scripture,
        scriptureText: data.scriptureText,
        time: new Date(),
      };

      sethistoryData((prev) => [...prev, newHistoryItem]);
      setSearchQuery("");
      toast.success("Scripture found successfully!");

      // Update user credits
      if (userData.credits !== null) {
        setuserData((prev) => ({ ...prev, credits: prev.credits! - 1 }));
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to search for Scripture. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen surface">
      <Head>
        <title>Scripture Search | Find Bible Scripture</title>
        <meta
          name="description"
          content="Search for Bible verses by describing stories and situations. AI-powered biblical search makes finding Scripture intuitive and fast."
        />
      </Head>
      <Header />
      <Toaster />

      <main className="container flex flex-col flex-grow max-w-4xl px-4 py-8 mx-auto">
        {!auth_.user ? (
          <div className="flex items-center justify-center flex-grow">
            <div className="space-y-6 text-center">
              <div className="mb-8">
                <Image
                  src={
                    isDarkTheme
                      ? "/images/bible/svg/light.svg"
                      : "/images/bible/svg/dark.svg"
                  }
                  alt="Bible"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="mb-4 heading-3">
                  Welcome to Find Bible Scripture
                </h3>
                <p className="max-w-md mx-auto text-azure-600 body-1 dark:text-azure-400">
                  Discover biblical wisdom by describing stories, situations, or
                  themes. Our AI will find the perfect Scripture passages for
                  you.
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-3 mx-auto button button-primary animate-press"
              >
                <Image src="/google.png" alt="Google" width={20} height={20} />
                Sign in with Google
              </button>
            </div>
          </div>
        ) : noData ? (
          <div className="flex items-center justify-center flex-grow">
            <div className="space-y-4 text-center">
              <Image
                src={
                  isDarkTheme
                    ? "/images/bible/svg/light.svg"
                    : "/images/bible/svg/dark.svg"
                }
                alt="Bible"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="mb-2 heading-4">Begin Your Scripture Search</h3>
              <p className="text-azure-600 body-2 dark:text-azure-400">
                Describe a biblical story, parable, or situation to discover
                relevant verses
              </p>
            </div>
          </div>
        ) : historyData.length === 0 ? (
          <div className="flex items-center justify-center flex-grow">
            <Ellipsis />
          </div>
        ) : (
          <div className="flex-grow mb-20 overflow-y-auto">
            {" "}
            {/* Added mb-20 for floating search space */}
            <div className="space-y-4">
              {historyData.map((hist, index) => (
                <div key={index} className="space-y-3">
                  {/* User Story - Always right aligned */}
                  <div className="flex justify-end animate-scaleIn">
                    <div className="max-w-[80%] md:max-w-[70%] p-4 rounded-2xl bg-azure-100 dark:bg-azure-800 rounded-br-sm hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center justify-end mb-2">
                        <span className="text-xs font-medium tracking-wide uppercase text-azure-500 dark:text-azure-400">
                          Your Story
                        </span>
                        <Image
                          src={
                            auth_.user?.photoURL ||
                            "/images/logo/brand-logo.svg"
                          }
                          alt="User"
                          width={20}
                          height={20}
                          className="ml-2 rounded-full"
                        />
                      </div>
                      <p className="leading-relaxed text-azure-700 body-1 dark:text-azure-200">
                        {hist.story}
                      </p>
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-azure-400 dark:text-azure-500">
                          {hist.time
                            ? new Date(
                                (hist.time as any).seconds
                                  ? (hist.time as any).seconds * 1000
                                  : hist.time
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Now"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scripture Response - Always left aligned */}
                  <div className="flex justify-start animate-scaleIn">
                    <div
                      className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl bg-[var(--brand-secondary)] dark:bg-[var(--brand-tertiary)] rounded-bl-sm hover:shadow-lg transition-shadow duration-200 ${
                        hist.scripture?.trim() === "not found" ||
                        !hist.scriptureText
                          ? "border-l-4 border-red-400 dark:border-red-500"
                          : "border-l-4 border-[var(--brand-primary)] dark:border-[var(--brand-secondary)]"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Image
                          src={
                            isDarkTheme
                              ? "/images/bible/svg/light.svg"
                              : "/images/bible/svg/dark.svg"
                          }
                          alt="Bible Scripture Bot"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span
                          className="px-2 py-1 text-xs font-medium tracking-wide uppercase transition-colors rounded cursor-pointer text-azure-500 dark:text-azure-400 hover:bg-azure-200 dark:hover:bg-azure-700"
                          onClick={() => {
                            navigator.clipboard.writeText("Scripture Found");
                            toast.success("Label copied to clipboard!");
                          }}
                          title="Click to copy"
                        >
                          Scripture Found
                        </span>
                      </div>

                      {hist.scripture?.trim() === "not found" ||
                      !hist.scriptureText ? (
                        <div className="text-center">
                          <p className="mb-3 text-red-600 dark:text-red-400 body-2">
                            No matching Scripture found for this story
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            className="px-2 py-1 mb-2 font-semibold text-[var(--brand-primary)] transition-colors rounded cursor-pointer dark:text-[var(--brand-secondary)] body-2 hover:bg-[var(--brand-secondary)] dark:hover:bg-[var(--brand-tertiary)]"
                            onClick={() => {
                              if (hist.scripture) {
                                navigator.clipboard.writeText(hist.scripture);
                                toast.success("Scripture reference copied!");
                              }
                            }}
                            title="Click to copy scripture reference"
                          >
                            {hist.scripture}
                          </p>
                          <p
                            className="px-2 py-1 italic leading-relaxed transition-colors rounded cursor-pointer text-azure-700 dark:text-azure-200 body-1 hover:bg-azure-50 dark:hover:bg-azure-800/30"
                            onClick={() => {
                              if (hist.scriptureText) {
                                navigator.clipboard.writeText(
                                  hist.scriptureText
                                );
                                toast.success("Scripture text copied!");
                              }
                            }}
                            title="Click to copy scripture text"
                          >
                            &ldquo;{hist.scriptureText}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-azure-400 dark:text-azure-500">
                          {hist.time
                            ? new Date(
                                (hist.time as any).seconds
                                  ? (hist.time as any).seconds * 1000
                                  : hist.time
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Now"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Search Input - Fixed at bottom */}
        {auth_.user && (
          <div className="fixed bottom-0 left-0 right-0 p-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-grow">
                  <textarea
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe a biblical story, parable, or situation you'd like to find verses for..."
                    className="w-full p-3 text-azure-900 bg-white dark:text-azure-100 dark:bg-azure-800  rounded-xl input resize-none min-h-[60px] max-h-[120px] shadow-sm"
                    rows={2}
                    disabled={searchLoading || userData.credits === 0}
                  />
                </div>
                <button
                  type="submit"
                  disabled={
                    searchLoading ||
                    !searchQuery.trim() ||
                    userData.credits === 0
                  }
                  className="px-6 py-3 shadow-sm button button-primary animate-press rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {searchLoading ? <Ellipsis /> : "Send"}
                </button>
              </form>

              <div className="flex items-center justify-between mt-2">
                <p
                  className="text-xs transition-colors cursor-pointer text-azure-500 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-200"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Credits remaining: ${
                        userData.credits !== null ? userData.credits : "..."
                      }`
                    );
                    toast.success("Credit information copied!");
                  }}
                  title="Click to copy"
                >
                  💳 Credits remaining:{" "}
                  {userData.credits !== null ? userData.credits : "..."}
                </p>
                <p className="text-xs text-azure-400 dark:text-azure-500">
                  Each search uses 1 credit
                </p>
              </div>

              {userData.credits === 0 && (
                <p className="mt-2 text-sm text-center text-red-600 dark:text-red-400">
                  You're out of credits. Please contact support for more
                  assistance.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;
