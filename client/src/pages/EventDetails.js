import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/eventDetails.css';

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
return(
    <div className="event-details-container">
            <h2 className="event-title">{event.titulo}</h2>
            <img 
                src="https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg" 
                alt="Evento destacado" 
                className="event-image"
            />
            <p className="event-description">{event.descripcion}</p>
            <p className="event-detail"><strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}</p>
            <p className="event-detail"><strong>Lugar:</strong> {event.ubicacion || 'No especificado'}</p>
            <p className="event-detail"><strong>Organizador:</strong> {event.organizadores || 'Desconocido'}</p>
            <p className="event-detail"><strong>Capacidad:</strong> {event.cupo_disponible || 'No especificado'}</p>
            <p className="event-detail"><strong>Categoría:</strong> {event.categoria_evento || 'Sin categoría'}</p>

            <div className="ticket-options">
    <div className="ticket-option">
        <label htmlFor="ticketQuantity">Cantidad de entradas:</label>
        <select
            id="ticketQuantity"
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
    <div className="ticket-option">
        <label htmlFor="ticketType">Tipo de entrada:</label>
        <select
            id="ticketType"
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
</div>


            {tickets && ticketType && (
                <div className="ticket-total">
                    <p><strong>Total:</strong> ${price * tickets}</p>
                </div>
            )}

            <button
                className="btn-purchase"
                onClick={handlePurchase}
                disabled={!tickets || !ticketType}
            >
                Comprar entradas
            </button>
        </div>
    );
};

export default EventDetails;

