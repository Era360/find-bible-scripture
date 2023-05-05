import React from 'react'
import Link from 'next/link'
import { signOut } from 'firebase/auth'

// Local imports
import { useAuth } from '@/utils/use-auth'
import { auth } from '@/firebase'
import Avatar from './avatar/avatar'
import Popover from './popover'

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
                                <Popover content={
                                    <div className="px-4 py-2 ">
                                        <div className='flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900' onClick={() => signOut(auth)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg>
                                            <p> Sign out </p>
                                        </div>
                                    </div>}
                                >
                                    <Avatar user_image={auth_.user.photoURL} />
                                </Popover>
                            </div>
                                :
                                <Link href="/search" className="p-2 text-lg font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
                                    Sign Up
                                </Link>
                        }
                    </div>
                    <div className="flex -mr-2 sm:hidden">
                        <Popover content={
                            <div className="px-4 py-2">
                                <div className='flex items-center justify-center pb-1 space-x-2 border-b border-gray-400'>
                                    <Avatar user_image={auth_.user?.photoURL} />
                                    <p className="font-medium text-gray-700">{auth_.user?.displayName}</p>
                                </div>
                                <div className='flex items-center justify-center pt-1 space-x-2 text-red-700 border cursor-pointer' onClick={() => signOut(auth)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                    <p> Sign out </p>
                                </div>
                            </div>}
                        >
                            <svg className="block w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className="hidden w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Popover>
                    </div>
                </div>
            </div >
        </nav >
    )
}

export default Header