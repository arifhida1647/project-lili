import React from 'react';
import Link from 'next/link';

export default function Article() {
    return (
        <>
            <div className='flex justify-between px-5 py-5'>
                <div className='p-2 bg-green-500 rounded-xl '>
                    <Link href="/">
                        <img src="iconprev.svg" />
                    </Link>
                </div>
                <div className='font-bold font-semibold text-green-500 pt-2'>BYE TBC</div>
                <div></div>
            </div>
            <div>
                <Link href="#" passHref>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                        <div>
                            <img className="object-cover w-full rounded-t-lg h-25" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                                <p className="mb-3 text-xs text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <span className='p-2 text-xs bg-green-500 w-20 text-center shadow-xl text-white rounded-full'>Read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <Link href="#" passHref>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                        <div>
                            <img className="object-cover w-full rounded-t-lg h-25" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                                <p className="mb-3 text-xs text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <span className='p-2 text-xs bg-green-500 w-20 text-center shadow-xl text-white rounded-full'>Read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <Link href="#" passHref>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                        <div>
                            <img className="object-cover w-full rounded-t-lg h-25" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                                <p className="mb-3 text-xs text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <span className='p-2 text-xs bg-green-500 w-20 text-center shadow-xl text-white rounded-full'>Read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}
