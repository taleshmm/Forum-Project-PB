import { useEffect, useState } from 'react';
import { getTopStoriesIds } from '../../services/connections';
import Header from '../organism/Header';
import Footer from '../organism/Footer';
import CardStories from '../molecules/CardStories';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Loading from '../atoms/Loading';
import '../pages/styles/ReadTopics.css';

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
        <section className="read-topics-container">
          <h2 className="letter-theme">Posts</h2>
          <div className="grid-container-post">
            {topStoriesIds.length > 0 &&
              getCurrentPageIds().map((id) => <CardStories key={id} id={id} />)}
          </div>

          <div className="container-arrows">
            <button
              className="prev-button"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <MdOutlineArrowBackIos className="icon-arrow" />
            </button>
            <p>
              {currentPage} de {parseInt(topStoriesIds.length / 8)}
            </p>
            <button
              className="next-button"
              onClick={nextPage}
              disabled={currentPage * itemsPerPage >= topStoriesIds.length}
            >
              <MdOutlineArrowForwardIos className="icon-arrow" />
            </button>
          </div>
        </section>
      )}

      <Footer />
    </section>
  );
}
