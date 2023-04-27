import React from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'

// Local imports
import { useAuth } from '@/utils/use-auth'
import { auth } from '@/firebase'
import Avatar from './avatar/avatar'

function Header() {
    const auth_ = useAuth()

    return (
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
    )
}

export default Header