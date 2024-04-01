/* eslint-disable react/prop-types */
import { IoStarOutline } from 'react-icons/io5';
import { IoStarHalfSharp } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import { useState } from 'react';

export default function CardTopics({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function renderStars(num) {
    if (num < 5) {
      let iconsPrint = [];
      const numInt = parseInt(num);
      const numDec = num % 1;
      const diferenceStar = 5 - num;
      const numIntDiference = parseInt(diferenceStar);

      for (let i = 0; i < numInt; i++) {
        iconsPrint.push(<IoStarSharp className="text-yellow-base" key={i} />);
      }

      if (numDec !== 0) {
        iconsPrint.push(
          <IoStarHalfSharp className="text-yellow-base" key={`${numDec}-st`} />
        );
      }
      for (let i = 0; i < numIntDiference; i++) {
        iconsPrint.push(<IoStarOutline className="text-slate-400" key={i} />);
      }
      return iconsPrint;
    }

    return Array.from({ length: num }, (_, index) => (
      <IoStarSharp className="text-yellow-base" key={index} />
    ));
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedTitle =
    data.title.length > 35 ? data.title.slice(0, 35) + '...' : data.title;
  return (
    <section className="bg-zinc-800 w-full max-w-[350px] rounded-xl p-4 text-white">
      <h4 className="text-right text-slate-400 text-xs">{data.theme}</h4>
      <div className="flex items-center justify-start gap-3">
        <div
          className="h-14 w-14 rounded-full bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${data.photo})` }}
        ></div>
        <div className="flex flex-col">
          <h3>{data.name}</h3>
          <div className="flex">{renderStars(data.star)}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="font-bold text-blue-400" title={data.title}>
          {truncatedTitle}
        </h2>
        <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>{data.text}</p>
        {!isExpanded && (
          <button
            className="text-yellow-base hover:underline"
            onClick={handleToggleExpand}
          >
            See more
          </button>
        )}
      </div>
    </section>
  );
}
