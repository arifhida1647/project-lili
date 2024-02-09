import React from 'react';
import Link from 'next/link';

export default function Video() {
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
                            <a className="mt-3" href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                                <iframe width="100%" height="200" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </a>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <Link href="#" passHref>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                        <div>
                            <a className="mt-3" href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                                <iframe width="100%" height="200" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </a>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <Link href="#" passHref>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                        <div>
                            <a className="mt-3" href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                                <iframe width="100%" height="200" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </a>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            
        </>
    );
}
