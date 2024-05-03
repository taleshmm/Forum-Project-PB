/* eslint-disable react/prop-types */
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { useState, useEffect } from 'react';

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
      className={`h-10 ${
        colorLikes ? colorLikes : 'text-slate-800'
      } flex items-center gap-5`}
    >
      <div className="flex gap-2 items-center">
        <BiSolidLike
          onClick={handleLike}
          className={`cursor-pointer text-2xl ${
            likeClicked ? 'text-blue-500' : ''
          }`}
        />
        <span>{muchLike}</span>
      </div>
      <div className="flex gap-2 items-center">
        <BiSolidDislike
          onClick={handleDislike}
          className={`cursor-pointer text-2xl ${
            dislikeClicked ? 'text-red-500' : ''
          }`}
        />
        <span>{muchDislike}</span>
      </div>
    </section>
  );
}
