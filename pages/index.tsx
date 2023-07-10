import React from "react";
import Head from "next/head";
import Link from "next/link";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>
          Find Bible Scripture | Discover the Bible in a whole new way
        </title>
      </Head>

      <Header />

      <div className="px-4 py-16 mx-auto my-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold leading-9 text-center sm:text-5xl sm:leading-10 md:text-4xl lg:text-5xl">
            Discover the&nbsp;
            <span className="dark:text-azure-300 text-azure-400">Bible</span>
            &nbsp;in a whole new way
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-lg leading-7 md:max-w-xl md:text-xl sm:mt-4">
            Search for &nbsp;
            <span className="dark:text-azure-300 text-azure-400">
              Bible Verses
            </span>
            &nbsp;based on story descriptions, parables, or events in the Bible
            to deepen your understanding in seconds.
          </p>
          <div className="max-w-md mx-auto mt-10">
            <Link
              href="/search"
              className="px-6 py-3 space-x-2 font-semibold rounded-lg w-fit dark:bg-azure-50 bg-azure-950 dark:text-azure-800 text-azure-50"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
