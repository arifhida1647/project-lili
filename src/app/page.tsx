'use client'
import React, { useState, useEffect } from 'react';
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
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Define type for article data
interface VideoData {
  id: string;
  title: string;
  link: string;
  // Add other properties as needed
}
// Define type for article data
interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  // Add other properties as needed
}


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqLXB5H-9UGM7-Oj6vnd7vfF4d6jS5BYM",
  authDomain: "coba-e6c01.firebaseapp.com",
  projectId: "coba-e6c01",
  storageBucket: "coba-e6c01.appspot.com",
  messagingSenderId: "742858094690",
  appId: "1:742858094690:web:d023c9332598049ecb793b",
  measurementId: "G-Q4NQQF30SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Home() {
  const [video, setVideo] = useState<VideoData[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const videoCollection = collection(db, 'video');
        const snapshot = await getDocs(videoCollection);
        const videoData: VideoData[] = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().tittle,
          link: doc.data().link.replace(/width="\d+"/, `width="${'100%'}"`).replace(/height="\d+"/, `height="${'150'}"`)
        }));
        setVideo(videoData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, 'article');
        const snapshot = await getDocs(articlesCollection);
        const articlesData: ArticleData[] = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          imageUrl: doc.data().imageUrl,
          description: doc.data().description
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);
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
          {articles.map(article => (
            <SwiperSlide key={article.id}>
              <div className="p-2">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <a href="#">
                    <img className="rounded-t-lg" src={article.imageUrl} alt="" />
                  </a>
                  <div className="p-3">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{article.title}</h5>
                      <p className="mb-3 text-xs text-gray-700">{article.description}</p>
                      <span className='p-2 text-xs bg-green-500 w-20 text-center shadow-xl text-white rounded-full'>Read</span>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
          {video.map(video => (
            <SwiperSlide key={video.id}>
              <div className="p-2">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                    <div dangerouslySetInnerHTML={{ __html: video.link }}></div>
                  </a>
                  <div className="p-3">
                    <a href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                      <h5 className="mb-2 text-xs tracking-tight text-gray-900">{video.title}</h5>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
