import React, { useState } from 'react';
import '../components/newTicketForm.css';

const NewTicketForm = () => {
    const [formData, setFormData] = useState({
        nombreTicket: '',
        tipoPago: '',
        precio: '',
        limiteCompra: '',
        stock: '',
        fechaInicioVenta: '',
        horaInicioVenta: '',
        tipoCierre: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del ticket:', formData);
    };

    return (
        <form className="new-ticket-form" onSubmit={handleSubmit}>
            <h2>Nuevo tipo de ticket</h2>
            
            <label>Nombre del ticket</label>
            <input
                type="text"
                name="nombreTicket"
                placeholder="Ej: VIP"
                value={formData.nombreTicket}
                onChange={handleChange}
                required
            />

            <div className="tipo-pago">
                <label>
                    <input 
                        type="radio" 
                        name="tipoPago" 
                        value="Pago" 
                        onChange={handleChange} 
                        checked={formData.tipoPago === 'Pago'} 
                    /> Pago
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="tipoPago" 
                        value="Sin costo" 
                        onChange={handleChange} 
                        checked={formData.tipoPago === 'Sin costo'} 
                    /> Sin costo
                </label>
            </div>

            <label>Precio del ticket</label>
            <input
                type="number"
                name="precio"
                placeholder="Monto"
                value={formData.precio}
                onChange={handleChange}
                disabled={formData.tipoPago === 'Sin costo'}
                required
            />

            <label>Límite de Compra de ticket</label>
            <input
                type="number"
                name="limiteCompra"
                placeholder="Ej: 5"
                value={formData.limiteCompra}
                onChange={handleChange}
                required
            />

            <label>Stock del ticket</label>
            <input
                type="number"
                name="stock"
                placeholder="0000"
                value={formData.stock}
                onChange={handleChange}
                required
            />

            <label>Fecha de inicio de venta del ticket</label>
            <input
                type="date"
                name="fechaInicioVenta"
                value={formData.fechaInicioVenta}
                onChange={handleChange}
                required
            />

            <label>Hora de inicio de venta del ticket</label>
            <input
                type="time"
                name="horaInicioVenta"
                value={formData.horaInicioVenta}
                onChange={handleChange}
                required
            />

            <div className="tipo-cierre">
                <label>
                    <input 
                        type="radio" 
                        name="tipoCierre" 
                        value="Por fecha y hora" 
                        onChange={handleChange} 
                        checked={formData.tipoCierre === 'Por fecha y hora'} 
                    /> Por fecha y hora
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="tipoCierre" 
                        value="Por tiempo limitado" 
                        onChange={handleChange} 
                        checked={formData.tipoCierre === 'Por tiempo limitado'} 
                    /> Por tiempo limitado
                </label>
            </div>
            <p></p>
            <button type="submit">Agregar</button>
        </form>
    );
};

export default NewTicketForm;
