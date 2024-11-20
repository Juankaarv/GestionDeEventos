import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleNavigateToDetails = () => {
        // Navega a la página de detalles usando el ID del evento
        navigate(`/eventDetails/${event.evento_id}`);
    };

    return (
        <div className="event-card">
            <img
                /*src={event.image}*/
                src="https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg"
                alt={event.titulo}
                className="event-card-image"
                onClick={handleNavigateToDetails} // Opción: clic en la imagen
                style={{ cursor: 'pointer' }}
            />
            <div className="event-card-content">
                <h3>{event.titulo}</h3>
                <p>{event.descripcion}</p>
                <p>
                    <strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}
                </p>
                {/* Botón para ver detalles */}
                <button
                    className="event-card-button"
                    onClick={handleNavigateToDetails} // Botón de navegación
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export default EventCard;
