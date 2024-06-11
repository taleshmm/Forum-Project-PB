/* eslint-disable react/prop-types */
import { IoStarHalfSharp } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import '../molecules/styles/CardTopics.css';

export default function CardTopics({ story }) {
  const navigate = useNavigate();

  function renderStars(num) {
    const points = num / 50;
    let iconsPrint = [];
    if (points >= 5) {
      return Array.from({ length: 5 }, (_, index) => (
        <IoStarSharp className="star-icon" key={index} />
      ));
    }
    if (points < 5) {
      const numInt = parseInt(points);
      const numDec = points % 1;

      for (let i = 0; i < numInt; i++) {
        iconsPrint.push(<IoStarSharp className="star-icon" key={`${i}-sh`} />);
      }

      if (numDec !== 0) {
        iconsPrint.push(
          <IoStarHalfSharp className="star-icon" key={`${numDec}-st`} />
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
    <section className="card-topics" onClick={handleCardClick}>
      <h4>#{story.type}</h4>
      <div className="card-name">
        <div
          className="user-photo"
          style={{
            backgroundImage: `url(${
              story.photo
                ? story.photo
                : 'https://images.pexels.com/photos/3207694/pexels-photo-3207694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            })`,
          }}
        ></div>
        <div className="user-info">
          <h3>{story.by}</h3>
          <div className="stars">{renderStars(story.score)}</div>
        </div>
      </div>
      <div className="card-datas">
        <h2 className="title" title={story.title}>
          {truncatedTitle}
        </h2>
        <p className="description">{story.text}</p>
        <button className="read-more">Ver mais</button>
      </div>
    </section>
  );
}
