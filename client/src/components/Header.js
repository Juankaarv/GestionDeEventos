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
          <li><Link to="/ActiveEvents">Eventos</Link></li>
          <li><Link to="/Asientos">Asientos</Link></li>
          <li><Link to="/CheckPago">Check Pago</Link></li>
          <li><Link to="/MetodoPago">Metodo Pago</Link></li>
          <li><Link to="/zonasList">Zonas</Link></li>
          <li><Link to="/login">Ab</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
