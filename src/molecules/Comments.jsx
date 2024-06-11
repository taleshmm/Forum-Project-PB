import { useState, useEffect } from 'react';
import { getStoryById } from '../../services/connections';
import Likes from '../atoms/Likes';
import '../molecules/styles/Comments.css';

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
        <div className="comment-container">
          <p className="author">{data.by}</p>
          <p className="comment-text">
            {renderText()}{' '}
            {data.text && data.text.length > 330 ? (
              <button
                className="more-button-comment"
                onClick={handleToggleExpand}
              >
                {isExpanded ? 'Ver menos' : 'Ver mais'}
              </button>
            ) : (
              ''
            )}
          </p>
          <Likes like={parseInt((Math.random() * 1000).toFixed(4))} />
        </div>
      )}
    </>
  );
}
