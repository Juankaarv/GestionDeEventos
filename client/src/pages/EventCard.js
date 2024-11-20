import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.nombre} className="event-image" />
      <h3>{event.nombre}</h3>
      <p>{event.descripcion}</p>
      <span>{event.fecha}</span>
    </div>
  );
};

export default EventCard;
