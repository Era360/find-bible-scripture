import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // Initialize dark theme on client side only
    const initializeDarkTheme = () => {
      if (typeof window !== "undefined" && window.matchMedia) {
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
    };

    const cleanup = initializeDarkTheme();
    return cleanup;
  }, []);

  return (
    <div className="flex flex-col min-h-screen surface">
      <Head>
        <title>
          Find Bible Scripture | Revolutionary AI-Powered Biblical Search
        </title>
        <meta
          name="description"
          content="Discover Bible verses instantly by describing stories, parables, or situations. Our AI-powered search makes biblical study intuitive and accessible."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="flex items-center justify-center flex-grow px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="mb-6 heading-1">
              Discover the&nbsp;
              <span className="text-azure-600 dark:text-azure-400">Bible</span>
              &nbsp;in a revolutionary way
            </h1>

            <p className="max-w-2xl mx-auto mb-8 body-1 text-azure-600 dark:text-azure-300">
              Simply describe a biblical story, parable, or situation, and
              instantly find the corresponding&nbsp;
              <span className="font-semibold text-azure-600 dark:text-azure-400">
                Bible verses
              </span>
              &nbsp;using our AI-powered search technology.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/search"
                className="button button-primary px-8 py-4 min-w-[200px] animate-press"
              >
                Begin Your Search
              </Link>

              <Link
                href="/thanks"
                className="button button-secondary px-8 py-4 min-w-[200px]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid gap-8 mb-16 md:grid-cols-3">
            <div className="card animate-scaleIn">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-azure-600">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 heading-4">Smart AI Search</h3>
              <p className="body-2 text-azure-600 dark:text-azure-300">
                Describe biblical stories, themes, or situations in your own
                words to find the exact verses you need.
              </p>
            </div>

            <div className="card animate-scaleIn">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 heading-4">Lightning Fast</h3>
              <p className="body-2 text-azure-600 dark:text-azure-300">
                Get precise biblical references within seconds, complete with
                full verse text and context.
              </p>
            </div>

            <div className="card animate-scaleIn">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-orange-600 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 heading-4">Enhance Your Study</h3>
              <p className="body-2 text-azure-600 dark:text-azure-300">
                Discover meaningful connections in Scripture and deepen your
                biblical understanding effortlessly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Bible Image */}
      <div className="absolute bottom-0 left-0 right-0 mx-auto overflow-hidden -z-10 opacity-5">
        <Image
          className="w-full max-w-4xl mx-auto"
          src={
            isDarkTheme
              ? "/images/bible/svg/light.svg"
              : "/images/bible/svg/dark.svg"
          }
          width={800}
          height={600}
          alt="Bible illustration"
          priority
        />
      </div>

      <Footer />
    </div>
  );
}
