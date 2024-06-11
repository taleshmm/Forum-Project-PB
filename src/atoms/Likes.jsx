import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import '../atoms/styles/Likes.css';

export default function Likes({ like, colorLikes }) {
  const [muchLike, setMuchLike] = useState(like);
  const [muchDislike, setMuchDislike] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  useEffect(() => {
    const randomPercentage = Math.floor(Math.random() * 101);
    const dislike = Math.floor((like * randomPercentage) / 100);
    setMuchDislike(dislike);
  }, []);

  const handleLike = () => {
    if (!likeClicked) {
      setMuchLike(muchLike + 1);
      setLikeClicked(true);

      if (dislikeClicked) {
        setMuchDislike(muchDislike - 1);
        setDislikeClicked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!dislikeClicked) {
      setMuchDislike(muchDislike + 1);
      setDislikeClicked(true);

      if (likeClicked) {
        setMuchLike(muchLike - 1);
        setLikeClicked(false);
      }
    }
  };

  return (
    <section
      className="likes-section"
      style={{ color: `${colorLikes ? colorLikes : 'text-color'}` }}
    >
      <div className="like-container">
        <BiSolidLike
          onClick={handleLike}
          className={`like-icon ${likeClicked ? 'active' : ''}`}
        />
        <span>{muchLike}</span>
      </div>
      <div className="dislike-container">
        <BiSolidDislike
          onClick={handleDislike}
          className={`dislike-icon ${dislikeClicked ? 'active' : ''}`}
        />
        <span>{muchDislike}</span>
      </div>
    </section>
  );
}
