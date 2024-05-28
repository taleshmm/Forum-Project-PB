import React from 'react';
import { Link } from 'react-router-dom';
import MenuHeader from '../molecules/MenuHeader';
import '../organism/styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo-link">
          <img
            src="../src/assets/logo.png"
            alt="Logo site"
            className="logo-img"
          />
          <h1 className="logo-text">Ekros</h1>
        </Link>
        <MenuHeader className="menu" />
      </nav>
    </header>
  );
}
