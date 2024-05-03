/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getStoryById } from '../../services/connections';
import Likes from '../atoms/Likes';

export default function Comments({ id, newComment, api }) {
  const [data, setData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function getStory() {
      try {
        const fetchedStory = await getStoryById(id);
        setData(fetchedStory);
      } catch (error) {
        console.error('Error fetching story by ID:', error);
      }
    }
    if (!api) {
      setData(newComment);
    } else {
      getStory();
    }
  }, [id, newComment, api]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderText = () => {
    if (!data || !data.text) return '';

    if (isExpanded) {
      return data.text;
    } else {
      return data.text.length > 330
        ? data.text.replace(/[<>]/g, '').slice(0, 330) + '...'
        : data.text.replace(/[<>]/g, '');
    }
  };

  return (
    <>
      {data && (
        <div className="bg-gray-800 rounded-xl p-4 my-4">
          <p className="text-gray-400 text-sm mb-2">{data.by}</p>
          <p className="text-white">
            {renderText()}{' '}
            {data.text && data.text.length > 330 ? (
              <button
                className="text-green-500 hover:underline cursor-pointer"
                onClick={handleToggleExpand}
              >
                {isExpanded ? 'Ver menos' : 'Ver mais'}
              </button>
            ) : (
              ''
            )}
          </p>
          <Likes
            like={parseInt((Math.random() * 1000).toFixed(4))}
            colorLikes="text-zinc-300"
          />
        </div>
      )}
    </>
  );
}
