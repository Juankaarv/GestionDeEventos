import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error al cargar los detalles del evento:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!event) {
        return <p>Cargando detalles del evento...</p>;
    }

    return (
        <div className="container mt-4">
            <h2>{event.titulo}</h2>
            <p>{event.descripcion}</p>
            <p>
                <strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}
            </p>
            <p>
                <strong>Lugar:</strong> {event.ubicacion || 'No especificado'}
            </p>
            <p>
                <strong>Organizador:</strong> {event.organizadores || 'Desconocido'}
            </p>
            <p>
                <strong>Capacidad:</strong> {event.cupo_disponible || 'No especificado'}
            </p>
            <p>
                <strong>Categoría:</strong> {event.categoria_evento || 'Sin categoría'}
            </p>
            <p>
                <strong>URL:</strong>{' '}
                {event.url ? (
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                        {event.url}
                    </a>
                ) : (
                    'No disponible'
                )}
            </p>
        </div>
    );
};

export default EventDetails;
