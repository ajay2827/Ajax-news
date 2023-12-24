import Loader from '@/components/Loader';
import Logout from '@/components/Logout';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { FaRegHeart } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [news, setNews] = useState(null);
  const [isGridView, setIsGridView] = useState(false);
  const { authUser, isLoading, setArticles } = useAuth();
  const router = useRouter();

  const toastOptions = {
    position: 'top-center',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const fetchdata = async () => {
    const res = await fetch(
      'https://newsapi.org/v2/top-headlines/sources?apiKey=8f1016dc445f46c6a257e698c9fca124'
    );
    const repo = await res.json();
    const limitedArticles = repo.sources.slice(0, 50);
    setNews(limitedArticles);
    setArticles(limitedArticles);
    if (navigator.onLine) {
      const limitedArticlesOffline = repo.sources.slice(0, 7);
      localStorage.setItem(
        'cachedArticles',
        JSON.stringify(limitedArticlesOffline)
      );
    }
  };

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('userInfo'));
    if (!loginUser && authUser) {
      localStorage.setItem('userInfo', JSON.stringify(authUser));
    }

    const fetchInitialData = async () => {
      if (!isLoading && !authUser) {
        router.push('/login');
        return;
      }

      if (!navigator.onLine) {
        const cachedArticles = JSON.parse(
          localStorage.getItem('cachedArticles')
        );
        if (cachedArticles) {
          const limitedCachedArticles = cachedArticles.slice(0, 7);
          setNews(limitedCachedArticles);
          setArticles(limitedCachedArticles);
        }
      } else {
        await fetchdata();
      }
    };

    fetchInitialData();
  }, [authUser, isLoading]);

  const toggleView = () => {
    setIsGridView((prevState) => !prevState);
  };

  const handleArticleClick = (articleId) => {
    router.push(`/${articleId}`);
  };

  const addToFavorite = async (setArticle) => {
    try {
      const docRef = await addDoc(collection(db, 'news-reader-app'), {
        owner: authUser.uid,
        content: setArticle,
      });
      if (docRef) {
        toast.success('Added to Favorite', toastOptions);
      }
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  return news == null ? (
    <Loader />
  ) : (
    <div className="min-w-full min-h-screen pb-10 bg-gradient-to-r from-violet-200 to-pink-200">
      <Logout />

      <div className="flex justify-center w-full ">
        <Navbar />
      </div>

      <div className="flex w-full justify-center mt-5 ">
        <span className="lg:py-5 lg:px-8 py-3 px-4  bg-white text-base lg:text-lg font-semibold rounded-xl ">
          Top Headlines
        </span>
      </div>

      <div className="w-full mt-10 lg:px-14 px-6 ">
        <div className="lg:flex justify-end mb-4 hidden">
          <button
            onClick={toggleView}
            className="px-4 py-2 shadow-[2px_2px_9px_0px_#FDF2F8] font-medium bg-gray-100 rounded-md"
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
          {news?.map((article, index) => (
            <div
              key={index}
              onClick={() => handleArticleClick(article.id)}
              className="relative p-6 bg-white rounded shadow cursor-pointer "
            >
              <button
                className="absolute text-red-500 top-2 right-4"
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavorite(article);
                }}
              >
                <FaRegHeart size={20} />
              </button>

              <h2 className="mb-2 text-xl font-bold">{article.name}</h2>
              <p className="text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
