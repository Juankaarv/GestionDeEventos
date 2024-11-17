import React from 'react';
import './Home.css';
import logo from '../img/AlicePark.jpg';

const Home = () => {
  return (
    <div className="home">
     
      <section className="main-banner">
        <img src={logo}  alt="Fan Fest" />
        <div className="banner-info">
          <h1>Fan Fest</h1>
          <p>Martes 15 de Octubre, 2024 | 18:00</p>
          <p>Alice Park, Cochabamba</p>
          <button>Comprar tickets</button>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
