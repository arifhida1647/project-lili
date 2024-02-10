'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Define type for article data
interface ArticleData {
    id: string;
    title: string;
    link: string;
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


export default function Video() {
    const [articles, setArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesCollection = collection(db, 'video');
                const snapshot = await getDocs(articlesCollection);
                const articlesData: ArticleData[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().tittle,
                    link: doc.data().link.replace(/width="\d+"/, `width="${'100%'}"`).replace(/height="\d+"/, `height="${'200'}"`)
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
            <div className='flex justify-between px-5 py-5'>
                <div className='p-2 bg-green-500 rounded-xl '>
                    <Link href="/">
                        <img src="iconprev.svg" />
                    </Link>
                </div>
                <div className='font-bold text-3xl text-green-500 pt-1'>Video</div>
                <div></div>
            </div>
            {articles.map(article => (
                <div key={article.id}>
                    <Link href="#" passHref>
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                            <div>
                                <a className="mt-3" href="https://www.youtube.com/watch?v=v9XyIGXcRck" target="_blank">
                                   <div dangerouslySetInnerHTML={{ __html: article.link }}></div>
                                </a>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{article.title}</h5>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    );
}
