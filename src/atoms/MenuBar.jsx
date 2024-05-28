
import { IoCreateSharp } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { FaReadme } from 'react-icons/fa6';
import { FaQuestionCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../atoms/styles/MenuBar.css';

export default function MenuBar({ open }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadJson() {
      try {
        const response = await fetch('../src/assets/datas-menu.json');
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
      className={`menu-bar ${open ? '' : 'menu-hidden'}`}
      onClick={open}
    >
      <nav className={`nav-bar ${open ? 'right-0' : ''}`}>
        <ul>
          {items.options &&
            items.options.map(({ name, link, icon }) => {
              return (
                <Link
                  to={link}
                  key={name}
                  className="nav-link"
                >
                  {renderIcon(icon)} <li>{name}</li>
                </Link>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
