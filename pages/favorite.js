import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';

const Favorite = () => {
  const [favoriteArticles, setFavoriteArticles] = useState(null);
  const [isGridView, setIsGridView] = useState(false);
  const router = useRouter();

  const fetchdata = async (uid) => {
    try {
      const q = query(
        collection(db, 'news-reader-app'),
        where('owner', '==', uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedArticles = [];
      querySnapshot.forEach((article) => {
        fetchedArticles.push(article.data().content);
      });
      setFavoriteArticles(fetchedArticles);
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('userInfo'));
    fetchdata(loginUser?.uid);
  }, []);

  const handleArticleClick = (articleId) => {
    router.push(`/${articleId}`);
  };

  const toggleView = () => {
    setIsGridView((prevState) => !prevState);
  };

  return favoriteArticles === null ? (
    <Loader />
  ) : (
    <div className=" w-full min-h-screen pb-10 bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex justify-center w-full ">
        <Navbar />
      </div>

      <div className="flex w-full justify-center mt-5">
        <span className="lg:py-5 lg:px-8 py-3 px-4  bg-white text-base lg:text-lg font-semibold rounded-xl ">
          Favorites
        </span>
      </div>

      <div className="w-full mt-10 lg:px-14 px-6 ">
        <div className="lg:flex justify-end mb-4 hidden">
          <button
            onClick={toggleView}
            className="px-4 py-2 font-medium shadow-[2px_2px_9px_0px_#FDF2F8] bg-gray-100 rounded-md"
          >
            {isGridView ? 'List View' : 'Grid View'}
          </button>
        </div>

        <div
          className={
            isGridView
              ? 'grid grid-cols-1 gap-6'
              : 'grid grid-cols-1 lg:grid-cols-2 gap-6'
          }
        >
          {favoriteArticles?.map((article, index) => (
            <div
              key={index}
              onClick={() => handleArticleClick(article.id)}
              className="relative p-6 bg-white rounded shadow cursor-pointer "
            >
              <h2 className="mb-2 text-xl font-bold">{article.name}</h2>
              <p className="text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
