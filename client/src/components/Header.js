import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">clicket.</div>
      <nav>
        <ul>
          <li><a href="../eventos">Eventos</a></li>
          <li><a href="../login">Ingresar</a></li>
         

        </ul>
      </nav>
    </header>
  );
};

export default Header;
