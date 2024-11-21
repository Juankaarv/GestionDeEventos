import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-bg">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Uticket.
        </Link>

        {/* Botón de colapso en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ActiveEvents">
                Eventos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Asientos">
                Asientos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/CheckPago">
                Check Pago
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MetodoPago">
                Método Pago
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/zonasList">
                Zonas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Ab
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
