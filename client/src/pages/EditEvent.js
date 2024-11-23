import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../pages/EditEvent.css';

const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        titulo: '',
        descripcion: '',
        fecha_hora: '',
        ubicacion: '',
        categoria_evento_id: '', // Campo para la categoría del evento
        url: '', // Campo para la URL del evento
        organizadores: '', // Campo para los organizadores
        precio_base: '', // Campo para el precio base
        es_evento_virtual: false, // Campo para indicar si es un evento virtual
        url_transmision: '', // URL de transmisión para eventos virtuales
        plataforma_virtual: '', // Plataforma virtual del evento
        cupo_disponible: '' // Campo para la capacidad del evento
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`);
                const data = await response.json();
                setEvent({ ...data });
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

        // Formatear las fechas para MySQL
        const formattedFechaHora = new Date(event.fecha_hora).toISOString().slice(0, 19).replace('T', ' ');

        // Crear un objeto con los datos del evento
        const updatedEvent = {
            ...event,
            fecha_hora: formattedFechaHora,
        };

        // Verifica si categoria_evento_id está vacío
        if (!updatedEvent.categoria_evento_id) {
            alert('La categoría del evento es obligatoria');
            return; // Detener la actualización si la categoría no está seleccionada
        }

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
                navigate('/active-events'); // Redirigir después de actualizar
            } else {
                alert('Error al actualizar el evento');
            }
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
        }
    };

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
                <form onSubmit={handleSave}>
            <div className="form-row">
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
                </div>

                    
            <div className="form-row">
                <label>
                    Categoría del Evento:
                    <select
                        name="categoria_evento_id"
                        value={event.categoria_evento_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="1">Conciertos</option>
                        <option value="2">Deportes</option>
                        <option value="3">Conferencias</option>
                    </select>
                </label>

                <label>
                    Organizadores:
                    <input
                        type="text"
                        name="organizadores"
                        value={event.organizadores}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Precio Base:
                    <input
                        type="number"
                        name="precio_base"
                        value={event.precio_base}
                        onChange={handleChange}
                    />
                </label>
                <label>
                        Capacidad:
                        <input
                            type="number"
                            name="cupo_disponible"
                            value={event.cupo_disponible}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* Campo para indicar si es un evento virtual */}
                <label>
                    Evento Virtual:
                    <input
                        type="checkbox"
                        name="es_evento_virtual"
                        checked={event.es_evento_virtual}
                        onChange={(e) => handleChange({ target: { name: 'es_evento_virtual', value: e.target.checked } })}
                    />
                </label>

                {/* URL de transmisión para evento virtual */}
                {event.es_evento_virtual && (
                    <label>
                        URL de Transmisión:
                        <input
                            type="url"
                            name="url_transmision"
                            value={event.url_transmision}
                            onChange={handleChange}
                        />
                    </label>
                )}

                {/* Plataforma virtual */}
                {event.es_evento_virtual && (
                    <label>
                        Plataforma Virtual:
                        <input
                            type="text"
                            name="plataforma_virtual"
                            value={event.plataforma_virtual}
                            onChange={handleChange}
                        />
                    </label>
                )}

                {/* Campo para la URL del Evento */}
                <label>
                    URL del Evento:
                    <input
                        type="url"
                        name="url"
                        value={event.url}
                        onChange={handleChange}
                    />
                </label>

               
            <div className='button-row'>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={() => navigate('/ActiveEvents')}>
                    Cancelar
                </button>
            </div>
               
            </form>
            </form>
        </div>
    );
};

export default EditEvent;
