import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../organism/Header';
import Likes from '../atoms/Likes';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import Comments from '../molecules/Comments';
import CommentInput from '../atoms/CommentInput';
import { getStoryById } from '../../services/connections';

export default function ReadTopicById() {
  const [story, setStory] = useState(null);
  const [commentsLocal, setCommentsLocal] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.story) {
      setStory(location.state.story);
    }
  }, [location]);

  const handleCommentSubmit = async (newComment) => {
    setCommentsLocal([...commentsLocal, newComment]);
  };

  useEffect(() => {
    async function fetchStoryData() {
      try {
        let fetchedStory = await getStoryById(story.id);
        if (!fetchedStory.text) {
          fetchedStory = {
            ...fetchedStory,
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          };
        }
        setStory(fetchedStory);
      } catch (error) {
        console.error('Error fetching story data:', error);
      }
    }

    if (story) {
      fetchStoryData();
    }
  }, [story]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="text-white">
      <Header />
      <div
        className="xl:fixed text-slate-300 flex items-center ml-4 mt-8 gap-2 cursor-pointer hover:text-yellow-base"
        onClick={handleGoBack}
      >
        <MdOutlineArrowBackIos className="text-2xl" />
        <span>Voltar</span>
      </div>

      {story && (
        <div className="max-w-screen-lg mx-auto mt-8 px-4">
          <h1 className="text-2xl font-bold text-green-400 mb-4">
            {story.title}
          </h1>
          <p className="text-gray-300 mb-4">By: {story.by}</p>
          <p className="text-gray-300 mb-4">
            {story.text.replace(/[<>]/g, '')}
          </p>
          <div className="border-t border-gray-700 mt-8 pt-4">
            <Likes
              colorLikes="text-zinc-300"
              like={
                story.score
                  ? story.score
                  : parseInt((Math.random() * 1000).toFixed(4))
              }
            />
            <CommentInput onSubmit={handleCommentSubmit} />
            <h2 className="text-xl font-bold text-green-400 mb-4 mt-6">
              Comments
            </h2>
            {commentsLocal.map((data) => (
              <Comments key={data.id} newComment={data} api={false} />
            ))}
            {story.kids &&
              story.kids.map((id) => <Comments key={id} api={true} id={id} />)}
          </div>
        </div>
      )}
    </section>
  );
}
