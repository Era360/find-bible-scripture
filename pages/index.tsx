import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// local imports
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Find Bible Scripture | Discover the Bible in a whole new way</title>
      </Head>

      <Header />

      <div className="px-4 py-16 mx-auto my-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold leading-9 md:text-4xl sm:text-5xl sm:leading-10">
            Discover the Bible in a whole new way
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-lg leading-7 md:text-xl sm:mt-4">
            Search for specific Bible verses by describing a small story, parable or event in the Bible.
          </p>
          <div className="max-w-md mx-auto mt-10">
            <Link href="/search" className='px-10 py-3 text-xl font-medium text-white bg-gray-800 rounded hover:bg-gray-700'>
              Search
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

