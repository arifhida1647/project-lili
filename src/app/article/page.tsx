'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Define type for article data
interface ArticleData {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    updatedAt: Date;
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

export default function Article() {
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesCollection = collection(db, 'article');
                const snapshot = await getDocs(articlesCollection);
                const articlesData: ArticleData[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    imageUrl: doc.data().imageUrl,
                    description: doc.data().description,
                    updatedAt: doc.data().date.toDate()
                }));
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false); // Set loading to false when done fetching
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
                <div className='font-bold text-3xl text-green-500 pt-1'>Article</div>
                <div></div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : (
                articles.map(article => (
                    <div key={article.id}>
                        <Link href="#" passHref>
                            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl mx-6 mb-5">
                                <div>
                                    <img className="object-cover w-full rounded-t-lg h-25" src={article.imageUrl} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <p className="mb-2 text-xs font-bold tracking-tight text-gray-500 ">{article.updatedAt.toLocaleString()}</p>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{article.title}</h5>                                    <span className='p-2 text-xs bg-green-500 w-20 text-center shadow-xl text-white rounded-full'>Read</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </>
    );
}
