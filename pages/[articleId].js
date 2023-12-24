import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/auth';
import Navbar from '@/components/Navbar';

export default function ArticleDetail() {
  const router = useRouter();
  const { articles } = useAuth();
  const { articleId } = router.query;
  const selectedArticle = articles?.find((article) => article.id === articleId);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex justify-center w-full ">
        <Navbar />
      </div>

      <div className="flex justify-center w-full">
        <div className="flex flex-col items-start justify-start w-3/4 lg:w-4/12 p-5  shadow-[2px_2px_9px_0px_#FDF2F8] bg-white rounded-lg gap-y-4 mt-28">
          {selectedArticle ? (
            <>
              <h1 className="w-full text-3xl font-semibold text-center ">
                {selectedArticle.name}
              </h1>
              <p className="w-full text-lg font-normal ">
                {selectedArticle.description}
              </p>
              <p className="w-full text-lg font-normal ">
                category : {selectedArticle.category}
              </p>
              <p>
                url :
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-800 "
                >
                  {selectedArticle.url}
                </a>
              </p>
            </>
          ) : (
            <p>Article not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
