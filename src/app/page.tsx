'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="max-sm pb-14 bg-gradient-to-b from-green-500 via-green-400 to-transparent">
        <div className="grid grid-cols-2 gap-5 pt-9">
          <div className="pt-7 ps-9">
            <div className="text-3xl font-serif font-bold text-white ">
              BYE TBC
            </div>
            <div className="text-xs mt-3 mb-5 font-serif text-white ">
              PBL KEL 6 FKM UMJ X UPT PUSKESMAS KAMPUNG SAWAH
            </div>
          </div>
          <div className="">
            <div className="text-3xl font-serif font-bold text-white flex justify-center">
              <img src="logo.svg" alt="" className="max-h-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 px-2 items-center">
        <div className="flex items-center justify-center">
          <Link href="/reminder" className="block max-w-sm w-full p-3  bg-green-500 border border-gray-200 rounded-lg shadow-xl hover:bg-green-600 ">
            <div className="flex items-center justify-center">
              <img src="iconreminder.svg" alt="" />
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">Reminder</h5>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/article" className="block max-w-sm w-full p-3  bg-green-500 border border-gray-200 rounded-lg shadow-xl hover:bg-green-600 ">
            <div className="flex items-center justify-center">
              <img src="iconarticle.svg" alt="" />
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">Article</h5>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link href="" className="block max-w-sm w-full p-3  bg-green-500 border border-gray-200 rounded-lg shadow-xl hover:bg-green-600 ">
            <div className="flex items-center justify-center">
              <img src="iconinfo.svg" alt="" />
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">Info TBC</h5>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/puskesmas" className="block max-w-sm w-full p-3  bg-green-500 border border-gray-200 rounded-lg shadow-xl hover:bg-green-600 ">
            <div className="flex items-center justify-center">
              <img src="iconpkm.svg" alt="" />
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">Info PKM</h5>
            </div>
          </Link>
        </div>
      </div>
      <div className='mt-12'>
        <div className='flex'>
          <p className='font-semibold text-xl ms-5 mb-5'>Article</p>
          <Link href='/article' className='text-xs me-5 p-2 ml-auto bg-green-400 h-8 rounded-2xl text-white shadow hover:bg-green-600'>View All</Link>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                  <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </a>
                <div className="p-3">
                  <a href="#">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div></SwiperSlide>
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                  <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </a>
                <div className="p-3">
                  <a href="#">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div></SwiperSlide>
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                  <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1707274626870-c8a975b24fe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </a>
                <div className="p-3">
                  <a href="#">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div></SwiperSlide>

        </Swiper>
      </div>
      <div className='mt-12'>
        <div className='flex'>
        <p className='font-semibold text-xl ms-5 mb-5'>Video</p>
        <Link href='/video' className='text-xs me-5 p-2 ml-auto bg-green-400 h-8 rounded-2xl text-white shadow hover:bg-green-600'>View All</Link>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                  <iframe width="100%" height="150" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </a>
                <div className="p-3">
                  <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                  <iframe width="100%" height="150" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </a>
                <div className="p-3">
                  <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div></SwiperSlide>
          <SwiperSlide>
            <div className="p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                  <iframe width="100%" height="150" src="https://www.youtube.com/embed/M5QY2_8704o" title="Chillstep Music for Programming / Cyber / Coding" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </a>
                <div className="p-3">
                  <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                    <h5 className="mb-2 text-xs tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                  </a>
                </div>
              </div>
            </div></SwiperSlide>

        </Swiper>
      </div>
    </>
  );
}
