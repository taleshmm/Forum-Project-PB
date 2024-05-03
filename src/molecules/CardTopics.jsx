/* eslint-disable react/prop-types */
import { IoStarHalfSharp } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function CardTopics({ story }) {
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/topics/${story.id}`, { state: { story } });
  };

  const truncatedTitle =
    story.title.length > 35 ? story.title.slice(0, 35) + '...' : story.title;
  return (
    <section className="bg-zinc-800 w-full max-w-[350px] rounded-xl p-4 text-white">
      <h4 className="text-right text-slate-400 text-xs">#{story.type}</h4>
      <div className="flex items-center justify-start gap-3">
        <div
          className="h-14 w-14 rounded-full bg-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              story.photo
                ? story.photo
                : 'https://images.pexels.com/photos/3207694/pexels-photo-3207694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            })`,
          }}
        ></div>
        <div className="flex flex-col">
          <h3>{story.by}</h3>
          <div className="flex">{renderStars(story.score)}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="font-bold text-blue-400" title={story.title}>
          {truncatedTitle}
        </h2>
        <p className="line-clamp-3">{story.text}</p>
        <button
          className="text-yellow-base hover:underline cursor-pointer"
          onClick={handleCardClick}
        >
          Ver mais
        </button>
      </div>
    </section>
  );
}
