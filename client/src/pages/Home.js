import React from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <section className="main-banner">
        <img src="url_de_la_imagen_principal" alt="Fan Fest" />
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
