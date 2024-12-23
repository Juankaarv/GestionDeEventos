import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        titulo: '',
        descripcion: '',
        fecha_hora: '',
        ubicacion: '',
        aforo: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error al cargar el evento:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Convertir la fecha y hora a un formato que MySQL pueda aceptar (sin la zona horaria)
        const formattedFechaHora = new Date(event.fecha_hora).toISOString().slice(0, 19).replace('T', ' ');
        
        // Crear un objeto de evento actualizado con la fecha formateada
        const updatedEvent = { ...event, fecha_hora: formattedFechaHora };
   
        try {
            const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEvent)
            });
   
            if (response.ok) {
                alert('Evento actualizado exitosamente');
                navigate('/active-events'); // Redirige a la vista de eventos activos
            } else {
                alert('Error al actualizar el evento');
            }
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
        }
    };
   

    // Formatear la fecha si existe
    const formattedDate = event.fecha_hora ? new Date(event.fecha_hora).toISOString().slice(0, 16) : '';

    return (
        <div className="edit-event">
            <h2>Editar Evento</h2>
            <form onSubmit={handleSave}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={event.titulo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={event.descripcion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Fecha y Hora:
                    <input
                        type="datetime-local"
                        name="fecha_hora"
                        value={formattedDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Ubicación:
                    <input
                        type="text"
                        name="ubicacion"
                        value={event.ubicacion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Aforo:
                    <input
                        type="number"
                        name="aforo"
                        value={event.aforo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => navigate('/active-events')}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default EditEvent;
