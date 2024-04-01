/* eslint-disable react/prop-types */
import { IoCreateSharp } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { FaReadme } from 'react-icons/fa6';
import { FaQuestionCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenuBar({ open }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadJson() {
      try {
        const response = await fetch('src/assets/datas-menu.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    loadJson();
  }, []);

  function renderIcon(nameIcon) {
    switch (nameIcon) {
      case 'IoMdHome':
        return <IoMdHome />;
      case 'FaReadme':
        return <FaReadme />;
      case 'FaQuestionCircle':
        return <FaQuestionCircle />;
      case 'IoCreateSharp':
        return <IoCreateSharp />;
      default:
        return null;
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-white/50 ${
        open ? 'block' : 'hidden'
      } z-10`}
      onClick={open}
    >
      <nav
        className={`fixed top-0 p-5 ${
          open ? 'right-0' : '-right-full'
        } w-3/5 max-w-80 z-11 h-screen bg-zinc-800 shadow-lg overflow-y-auto transition-transform duration-300`}
      >
        <ul className="text-yellow-base flex flex-col items-start justify-center gap-1">
          {items.options &&
            items.options.map(({ name, link, icon }) => {
              return (
                <Link
                  to={link}
                  key={name}
                  className="text-xl cursor-pointer hover:bg-yellow-base hover:text-black w-full p-2 rounded-md flex items-center gap-4"
                >
                  {renderIcon(icon)} <li className="font-bold">{name}</li>
                </Link>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
