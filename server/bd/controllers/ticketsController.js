// server/bd/controllers/ticketsController.js
const db = require('../../index');  // Importar la conexión de index.js

// Obtener todos los tickets
exports.getAllTickets = (req, res) => {
    const query = 'SELECT * FROM Tickets';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo los tickets' });
        } else {
            res.json(results);
        }
    });
};

// Obtener ticket por ID
exports.getTicketById = (req, res) => {
    const query = 'SELECT * FROM Tickets WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo el ticket' });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear nuevo ticket
exports.createTicket = (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado, carnet_usuario } = req.body;
    const query = 'INSERT INTO Tickets (codigo_ticket, usuario_id, evento_id, estado, carnet_usuario) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [codigo_ticket, usuario_id, evento_id, estado, carnet_usuario], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creando el ticket' });
        } else {
            res.json({ message: 'Ticket creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar ticket
exports.updateTicket = (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado, carnet_usuario } = req.body;
    const query = 'UPDATE Tickets SET codigo_ticket = ?, usuario_id = ?, evento_id = ?, estado = ?, carnet_usuario = ? WHERE id = ?';
    db.query(query, [codigo_ticket, usuario_id, evento_id, estado, carnet_usuario, req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error actualizando el ticket' });
        } else {
            res.json({ message: 'Ticket actualizado con éxito' });
        }
    });
};

// Eliminar ticket
exports.deleteTicket = (req, res) => {
    const query = 'DELETE FROM Tickets WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error eliminando el ticket' });
        } else {
            res.json({ message: 'Ticket eliminado con éxito' });
        }
    });
};
