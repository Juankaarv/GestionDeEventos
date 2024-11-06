import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de haber instalado react-router-dom
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Uticket.</div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/login">Ingresar</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
