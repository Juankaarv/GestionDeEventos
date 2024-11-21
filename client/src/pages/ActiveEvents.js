import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
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

    const handleViewMore = (eventId) => {
        navigate(`/eventDetailsAdmin/${eventId}`);
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
 
    return (
        <div className="active-events">
            <h2>Eventos Activos</h2>
 
            {/* Botón "Crear Evento" */}
            <button 
                onClick={() => navigate('/RegisterEvent')} 
                style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#A86666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Crear Evento
            </button>
 
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Inicio del Evento</th>
                        <th>Lugar</th>
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
                                <td>
                                    <button onClick={() => handleViewMore(event.evento_id)}>Más Información</button>
                                    <button onClick={() => handleEdit(event.evento_id)}>Editar</button>
                                    <button onClick={() => handleDelete(event.evento_id)}>Eliminar</button>
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
