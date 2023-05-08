import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Head from 'next/head'

// Local imports
import Header from '@/components/header'
import { useAuth } from '@/utils/use-auth'
import { db } from '@/firebase'
import { Data } from './api/search'
import Ellipsis from '@/components/ellipsis/ellipsis'

interface HistoryData extends Data {
    id: string
}

function History() {
    const [historyData, sethistoryData] = useState<Array<HistoryData>>([])
    const [noData, setnoData] = useState<boolean>(false)
    const auth_ = useAuth()
    const navigate = useRouter()

    useEffect(() => {
        const fetchHistory = async () => {
            if (auth_.user) {
                const historyRef = collection(db, `users/${auth_.user.uid}/history`)
                const q = query(historyRef, orderBy("time", "desc"), limit(10));

                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setnoData(true)
                } else {
                    let theData: HistoryData[] = []
                    querySnapshot.forEach((doc) => {
                        theData.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    sethistoryData(theData)
                }
            }
        }

        if (historyData.length == 0 && !noData) {
            fetchHistory()
        }

    }, [auth_.user, historyData.length, noData])

    return (
        <div>
            <Head>
                <title>History | Discover the Bible in a whole new way</title>
            </Head>
            <Header />
            <section>
                <h2 className='my-5 text-2xl font-semibold text-center md:text-4xl'>History</h2>
                {
                    noData ? <div className='flex flex-col items-center mx-auto mt-10 w-fit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                            <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                        <p className='text-lg'>No history available</p>
                    </div>
                        :
                        historyData.length === 0 ? <div className='mt-32 text-center'>
                            <Ellipsis />
                        </div>
                            :
                            <div className='w-5/6 mx-auto mb-10 space-y-10 md:w-3/4'>
                                {
                                    historyData.map((hist, index) => (
                                        <div key={index} className="px-6 py-2 mx-auto border border-gray-600 rounded-md md:px-10 w-fit hover:shadow-md hover:shadow-black">
                                            <p><span className="font-bold">Story: </span>{hist.story}</p>
                                            {
                                                hist.scripture?.trim() === "not found" &&
                                                <div className='mx-auto my-1 w-fit'>
                                                    <button onClick={() => {
                                                        navigate.push(`/search?story=${hist.id}`)
                                                    }} className='px-3 py-1 border rounded'>Edit Story</button>
                                                </div>
                                            }
                                            <p className={`text-lg md:text-xl font-bold text-center ${hist.scripture?.trim() !== "not found" ? "border-b-2 md:border-b-4" : "border-t-2"}`}>{hist.scripture}</p>
                                            <p className="my-3 text-base text-justify md:text-center md:text-xl">{hist.scriptureText}</p>
                                        </div>
                                    ))
                                }
                            </div>
                }
            </section>
        </div>
    )
}

export default History