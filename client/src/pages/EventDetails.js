import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]); // Lista de tipos de tickets
    const [tickets, setTickets] = useState(''); // Cantidad de tickets seleccionados
    const [ticketType, setTicketType] = useState(''); // Tipo de ticket seleccionado
    const [price, setPrice] = useState(0); // Precio del ticket seleccionado

    // Obtener detalles del evento
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

    // Obtener tipos de tickets del backend
    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/tickets?evento_id=${eventId}`);
                const data = await response.json();
                setTicketTypes(data);
            } catch (error) {
                console.error('Error al cargar los tipos de tickets:', error);
            }
        };

        fetchTicketTypes();
    }, [eventId]);

    const handleTicketTypeChange = (e) => {
        const selectedType = e.target.value;
        setTicketType(selectedType);

        // Actualizar el precio basado en el tipo seleccionado
        const selectedTicket = ticketTypes.find(ticket => ticket.nombre === selectedType);
        setPrice(selectedTicket ? selectedTicket.precio : 0);
    };

    const handlePurchase = () => {
        const totalCost = tickets * price;
        alert(`Has comprado ${tickets} entradas de tipo ${ticketType} para el evento "${event.titulo}" por un total de $${totalCost.toFixed(2)}.`);
    };

    if (!event) {
        return <p>Cargando detalles del evento...</p>;
    }

    return (
        <div className="container mt-4">
            <h2>{event.titulo}</h2>
            <img 
                src="https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg" 
                alt="Evento destacado" 
                className="img-fluid rounded mb-4"
                style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
            <p>{event.descripcion}</p>
            <p><strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}</p>
            <p><strong>Lugar:</strong> {event.ubicacion || 'No especificado'}</p>
            <p><strong>Organizador:</strong> {event.organizadores || 'Desconocido'}</p>
            <p><strong>Capacidad:</strong> {event.cupo_disponible || 'No especificado'}</p>
            <p><strong>Categoría:</strong> {event.categoria_evento || 'Sin categoría'}</p>

            {/* Formulario para seleccionar entradas */}
            <div className="mt-4">
                <label htmlFor="ticketQuantity" className="form-label"><strong>Cantidad de entradas:</strong></label>
                <select
                    id="ticketQuantity"
                    className="form-select"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                >
                    <option value="">Seleccione cantidad</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-3">
                <label htmlFor="ticketType" className="form-label"><strong>Tipo de entrada:</strong></label>
                <select
                    id="ticketType"
                    className="form-select"
                    value={ticketType}
                    onChange={handleTicketTypeChange}
                >
                    <option value="">Seleccione tipo</option>
                    {ticketTypes.map((ticket) => (
                        <option key={ticket.id} value={ticket.nombre}>
                            {ticket.nombre} - ${ticket.precio}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar costo total */}
            {tickets && ticketType && (
                <div className="mt-3">
                    <p><strong>Total:</strong> ${price * tickets}</p>
                </div>
            )}

            {/* Botón de compra */}
            <button
                className="btn btn-primary mt-4"
                onClick={handlePurchase}
                disabled={!tickets || !ticketType}
            >
                Comprar entradas
            </button>
        </div>
    );
};

export default EventDetails;
