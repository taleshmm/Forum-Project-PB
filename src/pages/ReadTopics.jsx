import { useEffect, useState } from 'react';
import { getTopStoriesIds } from '../../services/connections';
import Header from '../organism/Header';
import Footer from '../organism/Footer';
import CardStories from '../molecules/CardStories';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Loading from '../atoms/Loading';

export default function ReadTopics() {
  const [topStoriesIds, setTopStoriesIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopStoriesIds() {
      try {
        const ids = await getTopStoriesIds();
        setTopStoriesIds(ids);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching top stories IDs:', error);
        setIsLoading(false);
      }
    }

    fetchTopStoriesIds();
  }, []);

  function getCurrentPageIds() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return topStoriesIds.slice(startIndex, endIndex);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <section className="h-full">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="w-full py-8 px-4 h-full text-white">
          <h2 className="letter-theme text-center text-3xl">Posts</h2>
          <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {topStoriesIds.length > 0 &&
              getCurrentPageIds().map((id) => <CardStories key={id} id={id} />)}
          </div>

          <div className="flex justify-around items-center mt-6">
            <button
              className="bg-yellow-base hover:bg-zinc-400 text-black cursor-pointer font-bold py-2 px-4 rounded"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <MdOutlineArrowBackIos className="text-xl" />
            </button>
            <p>
              {currentPage} de {parseInt(topStoriesIds.length / 8)}
            </p>
            <button
              className="bg-yellow-base hover:bg-zinc-400 text-black cursor-pointer font-bold py-2 px-4 rounded"
              onClick={nextPage}
              disabled={currentPage * itemsPerPage >= topStoriesIds.length}
            >
              <MdOutlineArrowForwardIos className="text-xl" />
            </button>
          </div>
        </section>
      )}

      <Footer />
    </section>
  );
}
