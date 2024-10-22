// server/bd/controllers/ticketsController.js
const db = require('../../db');

// Obtener todos los tickets
exports.getAllTickets = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Tickets');
        res.json(results);
    } catch (err) {
        console.error('Error obteniendo los tickets:', err);
        res.status(500).json({ error: 'Error obteniendo los tickets' });
    }
};

// Obtener ticket por ID
exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM Tickets WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error obteniendo el ticket:', err);
        res.status(500).json({ error: 'Error obteniendo el ticket' });
    }
};

// Crear nuevo ticket
exports.createTicket = async (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado_ticket_id } = req.body;
    try {
        const query = 'INSERT INTO Tickets (codigo_ticket, usuario_id, evento_id, estado_ticket_id) VALUES (?, ?, ?, ?)';
        const [results] = await db.query(query, [codigo_ticket, usuario_id, evento_id, estado_ticket_id]);
        res.status(201).json({ message: 'Ticket creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el ticket:', err);
        res.status(500).json({ error: 'Error creando el ticket' });
    }
};

// Actualizar ticket
exports.updateTicket = async (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado_ticket_id } = req.body;
    const { id } = req.params;
    try {
        const query = 'UPDATE Tickets SET codigo_ticket = ?, usuario_id = ?, evento_id = ?, estado_ticket_id = ? WHERE id = ?';
        const [results] = await db.query(query, [codigo_ticket, usuario_id, evento_id, estado_ticket_id, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json({ message: 'Ticket actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el ticket:', err);
        res.status(500).json({ error: 'Error actualizando el ticket' });
    }
};

// Eliminar ticket
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE Tickets SET activo = FALSE WHERE id = ?';
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        res.json({ message: 'Ticket marcado como inactivo' });
    } catch (err) {
        console.error('Error marcando el ticket como inactivo:', err);
        res.status(500).json({ error: 'Error marcando el ticket como inactivo' });
    }
};