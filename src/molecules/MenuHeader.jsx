import { MdAccountCircle } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import MenuBar from '../atoms/MenuBar';
import { Link } from 'react-router-dom';

export default function MenuHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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

  function handleMenuBar() {
    setIsOpenMenu(!isOpenMenu);
  }
  return (
    <>
      <div className="flex items-center gap-4 w-4/5 justify-end h-full">
        <ul className="sm:flex hidden items-center w-full h-full gap-4 justify-end ">
          {items.options &&
            items.options.map(({ name, link }) => {
              return (
                <li key={name} className="font-bold">
                  <Link
                    to={link}
                    className="text-lg text-white hover:text-black"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className="flex items-center gap-4 h-full w-auto">
          <MdAccountCircle className="text-yellow-base text-2xl cursor-pointer" />
          <GiHamburgerMenu
            className="text-yellow-base text-2xl cursor-pointer"
            onClick={handleMenuBar}
          />
        </div>
      </div>
      {isOpenMenu && <MenuBar open={handleMenuBar} />}
    </>
  );
}
