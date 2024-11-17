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
                    setEvents(events.filter(event => event.evento_id !== eventId));
                    alert('Evento eliminado exitosamente');
                } else {
                    alert('Hubo un error al eliminar el evento');
                }
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
            }
        }
    };

    // Función para obtener el tipo de evento
    const getTipoEvento = (evento) => {
        if (evento.es_evento_virtual && evento.ubicacion) {
            return 'Ambos'; // Evento presencial y virtual (híbrido)
        }
        if (evento.es_evento_virtual) {
            return 'Virtual'; // Solo virtual
        }
        return 'Presencial'; // Solo presencial
    };

    return (
        <div className="active-events">
            <h2>Eventos Activos</h2>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha y Hora de Inicio</th>
                        <th>Lugar</th>
                        <th>Organizador</th>
                        <th>Capacidad</th>
                        <th>Tipo de Evento</th>
                        <th>Tipo de Ticket</th> {/* Nueva columna */}
                        <th>Precio del Ticket</th> {/* Nueva columna */}
                        <th>Fecha de Fin de Venta</th> {/* Nueva columna */}
                        <th>Categoria del Evento</th> {/* Nueva columna */}
                        <th>URL del Evento</th> {/* Nueva columna para URL */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map(event => (
                            <tr key={event.evento_id}>
                                <td>{event.titulo}</td>
                                <td>{event.descripcion}</td>
                                <td>{new Date(event.fecha_hora).toLocaleString()}</td>
                                <td>{event.ubicacion || 'No especificado'}</td>
                                <td>{event.organizadores || 'Desconocido'}</td>
                                <td>{event.cupo_disponible || 'N/A'}</td>
                                <td>{getTipoEvento(event)}</td>

                                {/* Muestra los tickets asociados al evento */}
                                <td>
                                    {event.tickets && event.tickets.length > 0 ? (
                                        <ul>
                                            {event.tickets.map((ticket, index) => (
                                                <li key={index}>
                                                    {ticket.tipo_ticket || 'No disponible'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No disponible'
                                    )}
                                </td>

                                {/* Muestra el precio del ticket */}
                                <td>
                                    {event.tickets && event.tickets.length > 0 ? (
                                        event.tickets.map((ticket, index) => (
                                            <div key={index}>
                                                {ticket.precio ? `$${ticket.precio}` : 'Gratuito'}
                                            </div>
                                        ))
                                    ) : (
                                        'N/A'
                                    )}
                                </td>

                                {/* Muestra la fecha final de venta */}
                                <td>
                                    {event.tickets && event.tickets.length > 0 ? (
                                        event.tickets.map((ticket, index) => (
                                            <ul key={index}>
                                                <div>
                                                    <li>
                                                        {ticket.fecha_final_venta ? new Date(ticket.fecha_final_venta).toLocaleString() : 'N/A'}
                                                    </li>
                                                </div>
                                            </ul>
                                        ))
                                    ) : (
                                        'N/A'
                                    )}
                                </td>

                                <td>{event.categoria_evento || 'Sin categoría'}</td>
                                
                                {/* Muestra la URL del evento */}
                                <td>
                                    {event.url ? (
                                        <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a>
                                    ) : (
                                        'No disponible'
                                    )}
                                </td>

                                <td>
                                    <button onClick={() => handleEdit(event.evento_id)}>Editar</button>
                                    <button onClick={() => handleDelete(event.evento_id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No hay eventos activos</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default ActiveEvents;
