import Link from 'next/link'
import React from 'react'

export default function Puskesmas() {
    return (
        <>
            <div className='relative'>
                <div className='absolute top-3 left-3 w-7 rounded-lg'>
                    <Link href="/">
                        <img src="iconprev.svg" alt="" />
                    </Link>
                </div>
                <div className=''>
                    <img src="https://lh3.googleusercontent.com/p/AF1QipPxj_bh3CNBsrLCZTNeq8dB2w_F7H9jhDCOvG27=s1360-w1360-h1020" alt="" />
                </div>
            </div>
            <div className='relative  flex justify-center  bg-gradient-to-r from-green-400 to-blue-500 mx-5 rounded-xl shadow-xl' style={{ top: "-30px" }}>
                <div className='mx-3 p-3 text-center flex flex-col items-center'>
                    <img className="items-center" src="icontime.svg" alt="" />
                    <div className='text-xs pt-2'>
                        12.39 - 16.30 WIB
                    </div>
                </div>
                <div className='mx-3 p-3 text-center flex flex-col items-center'>
                    <img className="items-center" src="iconschedule.svg" alt="" />
                    <div className='text-xs pt-2'>
                        12.39 - 16.30 WIB
                    </div>
                </div>
            </div>
            <div className='font-bold text-xl ms-3'>
                Puskesmas Kampung Sawah
            </div>
            <div className='flex my-4 mx-3'>
                <div className='me-2'>
                    <img src="iconlocation.svg" alt="" />
                </div>
                <div className='' style={{ fontSize : "9px" }}>
                Jl. Gelatik No. 1 Kelurahan Sawah, Kecamatan Ciputat, Kota Tangerang Selatan
                </div>
            </div>
            <div className='text-xs mx-3'>
                Puskesmas Kampung Sawah mempunyai 1 kelurangan wilayah kerja
                yaitu kelurahan sawah dengan luas wilayah Ha/Km dengan jumlah penduduk 29.354 jiwa. Dalam wilayah kerja Puskesmas 
                kampung swah terdapat 54 RT dan 12 RW. Selain itu Puskesmas Kampung Sawah memiliki 25 Posyandu dan 8 posbindu dan mempunyai 
                jumlah kader sebanyak 193 kader kesehatan.
            </div>
            <div className='text-sm font-semibold my-2 mx-3'>
                Batas Wilayah Kerja Puskesmas Kampung Sawah
            </div>
            <div className='text-xs mx-3 mb-5'>
                a. Utara: Sawah Baru / Pondok Jaya <br />
                b. Selatan: Serua Indah / Kedaung <br />
                c. Barat: Sawah Baru <br />
                d. Timur: Pondok Ranji / Cempaka Putih <br />
            </div>
        </>
    )
}
