import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

// local imports
import Avatar from '@/components/avatar/avatar';
import { useAuth } from '@/utils/use-auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

export default function Home() {
  const auth_ = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Find Bible Scripture | Discover the Bible in a whole new way</title>
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
                  <Link href="/search" className="p-2 text-lg font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
                    Sign Up
                  </Link>
              }
            </div>
            <div className="flex -mr-2 sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
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
      <div className="px-4 py-16 mx-auto my-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold leading-9 sm:text-5xl sm:leading-10">
            Discover the Bible in a whole new way
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-xl leading-7 sm:mt-4">
            Search for specific Bible verses by describing a small story, parable or event in the Bible.
          </p>
          <div className="max-w-md mx-auto mt-10">
            <Link href="/search" className='px-10 py-3 text-xl font-medium text-white bg-gray-800 rounded hover:bg-gray-700'>
              Search
            </Link>
          </div>
        </div>
      </div>
      <footer className="py-2 mx-10 mt-auto border-t-2 border-gray-300">
        <div className="flex mx-auto space-x-10 w-fit">
          <Link href="https://twitter.com/eliah_mkumbo" target='_blank' className='group'>
            <svg
              aria-hidden="true"
              className="w-10 h-10 fill-gray-500 group-hover:fill-gray-400"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
            </svg>
          </Link>
          <Link href="https://github.com/Era360" target='_blank' className='group'>
            <svg
              aria-hidden="true"
              className="w-10 h-10 fill-gray-500 group-hover:fill-gray-400"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}



