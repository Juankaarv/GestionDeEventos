import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, date, location, price }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} />
      <div className="event-info">
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{location}</p>
        <p>Tickets desde {price}</p>
        <button>Comprar tickets</button>
      </div>
    </div>
  );
};

export default EventCard;
