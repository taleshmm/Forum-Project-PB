import { useState, useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuBar from '../atoms/MenuBar';
import { Link } from 'react-router-dom';
import '../molecules/styles/MenuHeader.css';

export default function MenuHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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

  function handleMenuBar() {
    setIsOpenMenu(!isOpenMenu);
  }

  return (
    <div className="menu-header">
      <ul className="menu-list sm:flex hidden items-center gap-4">
        {items.options &&
          items.options.map(({ name, link }) => (
            <li key={name} className="menu-list-item">
              <Link to={link} className="menu-link">
                {name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="menu-icons">
        <MdAccountCircle className="menu-icon" />
        <GiHamburgerMenu className="menu-icon" onClick={handleMenuBar} />
      </div>
      {isOpenMenu && <MenuBar open={handleMenuBar} />}
    </div>
  );
}
