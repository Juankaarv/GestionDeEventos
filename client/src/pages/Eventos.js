// src/pages/Evento.js
import React from 'react';
import Ticket from '../components/Ticket';

const Evento = () => {
  const ticketData = {
    ticketType: "VIP",
    title: "Concert 2024",
    name: "John Doe",
    date: "22-10-2024",
    address: "123 Main St, Cityville",
    qrCode: "https://example.com/qr-code.png", // Ruta a la imagen del QR
    id: "1234567890"
  };

  return (
    <div>
      <h1>Evento</h1>
      <h2>Ticket Físico</h2>
      <Ticket
        {...ticketData}
        type="physical"
      />
      <h2>Ticket Digital</h2>
      <Ticket
        {...ticketData}
        type="digital"
      />
    </div>
  );
};

export default Evento;
