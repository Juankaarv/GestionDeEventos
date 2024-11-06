// src/components/ActiveEvents.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/ActiveEvents.css';


const ActiveEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/eventos');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEdit = (eventId) => {
        // Redirige a la página de edición del evento con el ID del evento
        navigate(`/editEvent/${eventId}`);
    };

    const handleDelete = async (eventId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este evento?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // Filtra el evento eliminado de la lista de eventos
                    setEvents(events.filter(event => event.id !== eventId));
                    alert('Evento eliminado exitosamente');
                } else {
                    alert('Hubo un error al eliminar el evento');
                }
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
            }
        }
    };

    return (
        <div className="active-events">
            <h2>Eventos Activos</h2>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha y Hora</th>
                        <th>Lugar</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map(event => (
                            <tr key={event.id}>
                                <td>{event.titulo}</td>
                                <td>{event.descripcion}</td>
                                <td>{new Date(event.fecha_hora).toLocaleString()}</td>
                                <td>{event.ubicacion}</td>
                                <td>
                                    <button onClick={() => handleEdit(event.id)}>Editar</button>

                                    <button onClick={() => handleDelete(event.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay eventos activos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveEvents;
