/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getStoryById } from '../../services/connections';
import { IoStarHalfSharp } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import Likes from '../atoms/Likes';
import { useNavigate } from 'react-router-dom';

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
        <IoStarSharp className="text-yellow-600" key={index} />
      ));
    }
    if (points < 5) {
      const numInt = parseInt(points);
      const numDec = points % 1;

      for (let i = 0; i < numInt; i++) {
        iconsPrint.push(
          <IoStarSharp className="text-yellow-600" key={`${i}-sh`} />
        );
      }

      if (numDec !== 0) {
        iconsPrint.push(
          <IoStarHalfSharp className="text-yellow-600" key={`${numDec}-st`} />
        );
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
    <section
      onClick={handleCardClick}
      className="bg-zinc-300 hover:bg-white hover:cursor-pointer w-full max-w-[350px] rounded-xl px-4 pt-4 grid"
      style={{ gridTemplateRows: '1fr 40px' }}
    >
      {story && (
        <div>
          <h4 className="text-right text-slate-600 text-xs">#{story.type}</h4>
          <div className="flex items-center justify-start gap-3">
            <div
              className="h-14 w-14 rounded-full bg-black bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  story.photo ? story.photo : 'src/assets/logo.png'
                })`,
              }}
            ></div>
            <div className="flex flex-col">
              <h3 className="text-zinc-800 font-bold">{story.by}</h3>
              <div className="flex">{renderStars(story.score)}</div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h2 className="font-bold text-green-800" title={story.title}>
              {truncatedTitle}
            </h2>
            <p className="text-black">{truncatedText}</p>
          </div>
        </div>
      )}
      {story && (
        <div>
          <Likes
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
