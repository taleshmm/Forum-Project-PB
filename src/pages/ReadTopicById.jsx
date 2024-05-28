import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../organism/Header';
import Likes from '../atoms/Likes';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import Comments from '../molecules/Comments';
import CommentInput from '../atoms/CommentInput';
import { getStoryById } from '../../services/connections';
import '../pages/styles/ReadTopicsById.css'; 

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
    <section className="custom-container">
      <Header />
      <div
        className="custom-go-back flex items-center ml-4 mt-8 gap-2 cursor-pointer"
        onClick={handleGoBack}
      >
        <MdOutlineArrowBackIos className="custom-go-back-icon" />
        <span>Voltar</span>
      </div>

      {story && (
        <div className="custom-content">
          <h1 className="custom-title">
            {story.title}
          </h1>
          <p className="custom-author">By: {story.by}</p>
          <p className="custom-text">
            {story.text.replace(/[<>]/g, '')}
          </p>
          <div className="custom-divider">
            <Likes
              colorLikes="custom-likes"
              like={
                story.score
                  ? story.score
                  : parseInt((Math.random() * 1000).toFixed(4))
              }
            />
            <CommentInput onSubmit={handleCommentSubmit} />
            <h2 className="custom-comments-title">
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
