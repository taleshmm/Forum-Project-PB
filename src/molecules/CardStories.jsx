/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getStoryById } from '../../services/connections';
import { IoStarHalfSharp } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import Likes from '../atoms/Likes';
import { useNavigate } from 'react-router-dom';
import '../molecules/styles/CardStories.css';

export default function CardStories({ id }) {
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getStory() {
      try {
        let fetchedStory = await getStoryById(id);
        if (!fetchedStory.text) {
          fetchedStory = {
            ...fetchedStory,
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          };
        }
        setStory(fetchedStory);
      } catch (error) {
        console.error('Error fetching top stories IDs:', error);
      }
    }

    getStory();
  }, [id]);

  function renderStars(num) {
    const points = num / 50;
    let iconsPrint = [];
    if (points >= 5) {
      return Array.from({ length: 5 }, (_, index) => (
        <IoStarSharp key={index} />
      ));
    }
    if (points < 5) {
      const numInt = parseInt(points);
      const numDec = points % 1;

      for (let i = 0; i < numInt; i++) {
        iconsPrint.push(<IoStarSharp key={`${i}-sh`} />);
      }

      if (numDec !== 0) {
        iconsPrint.push(<IoStarHalfSharp key={`${numDec}-st`} />);
      }

      return iconsPrint;
    }
  }
  const truncatedTitle =
    story && story.title
      ? story.title.length > 35
        ? story.title.slice(0, 35) + '...'
        : story.title
      : '';

  const truncatedText =
    story && story.text
      ? story.text.length > 120
        ? story.text.slice(0, 120) + '...'
        : story.text
      : '';

  const handleCardClick = () => {
    navigate(`/topics/${id}`, { state: { story } });
  };

  return (
    <section className="card-stories">
      {story && (
        <div onClick={handleCardClick}>
          <h4 className="type">#{story.type}</h4>
          <div className="profile">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${
                  story.photo ? story.photo : 'src/assets/logo.png'
                })`,
              }}
            ></div>
            <div className="info">
              <h3 className="name">{story.by}</h3>
              <div className="stars">{renderStars(story.score)}</div>
            </div>
          </div>
          <div className="text">
            <h2 className="title" title={story.title}>
              {truncatedTitle}
            </h2>
            <p>{truncatedText}</p>
          </div>
        </div>
      )}
      {story && (
        <div className="likes">
          <Likes
            colorLikes="#000"
            like={
              story.score
                ? story.score
                : parseInt((Math.random() * 1000).toFixed(4))
            }
          />
        </div>
      )}
    </section>
  );
}
