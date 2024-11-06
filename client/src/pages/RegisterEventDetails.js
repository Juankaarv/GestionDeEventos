import React, { useState } from 'react';
import '../components/RegisterEventDetails.css';

const RegisterEventDetails = ({ eventData }) => {
    const [formData, setFormData] = useState({
        fechaInicio: '',
        horaInicio: '',
        fechaFin: '',
        horaFin: '',
        aperturaPuertas: '',
        modalidad: '',
        nombreLugar: '',
        ciudad: 'Cochabamba',
        enlaceUbicacion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventDetails = { ...eventData, ...formData };
    
        try {
            const response = await fetch('http://localhost:3001/api/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoria_evento_id: eventDetails.categoriaEventoId,
                    titulo: eventDetails.nombreEvento,
                    url: eventDetails.enlaceUbicacion,
                    descripcion: eventDetails.descripcionEvento,
                    ubicacion: eventDetails.nombreLugar,
                    fecha_hora: `${eventDetails.fechaInicio} ${eventDetails.horaInicio}`,
                    precio_base: eventDetails.precioBase,
                    cupo_disponible: eventDetails.aforo,
                    es_evento_virtual: eventDetails.modalidad === 'Virtual' || eventDetails.modalidad === 'Híbrido',
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error al guardar el evento:', error);
            alert('Hubo un error al guardar el evento.');
        }
    };

    return (
        <form className="register-event-details-form" onSubmit={handleSubmit}>
            <h2>Eventos Activos</h2>
            <p>Ingresa la información básica de tu evento.</p>

            <div className="fecha-section">
                <h3>Fecha</h3>
                <div className="fecha-fields">
                    <div>
                        <label>Fecha y hora de inicio del evento</label>
                        <input
                            type="date"
                            name="fechaInicio"
                            value={formData.fechaInicio}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="time"
                            name="horaInicio"
                            value={formData.horaInicio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha y hora de fin del evento</label>
                        <input
                            type="date"
                            name="fechaFin"
                            value={formData.fechaFin}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="time"
                            name="horaFin"
                            value={formData.horaFin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apertura de puertas</label>
                        <input
                            type="time"
                            name="aperturaPuertas"
                            value={formData.aperturaPuertas}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="lugar-section">
                <h3>Lugar</h3>
                <p>Ubicación donde se va a realizar el evento</p>
                <div className="modalidad-options">
                    <label>
                        <input
                            type="radio"
                            name="modalidad"
                            value="Presencial"
                            checked={formData.modalidad === 'Presencial'}
                            onChange={handleChange}
                            required
                        />
                        Presencial
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="modalidad"
                            value="Virtual"
                            checked={formData.modalidad === 'Virtual'}
                            onChange={handleChange}
                            required
                        />
                        Virtual
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="modalidad"
                            value="Híbrido"
                            checked={formData.modalidad === 'Híbrido'}
                            onChange={handleChange}
                            required
                        />
                        Híbrido
                    </label>
                </div>
                <input
                    type="text"
                    name="nombreLugar"
                    placeholder="Nombre del lugar"
                    value={formData.nombreLugar}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="enlaceUbicacion"
                    placeholder="Enlace de Google Maps"
                    value={formData.enlaceUbicacion}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Guardar Evento</button>
        </form>
    );
};

export default RegisterEventDetails;
