const db = require('../../index');  

// Obtener todos los tickets
exports.getAllTickets = (req, res) => {
    const query = 'SELECT * FROM Tickets';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo los tickets:', err);
            res.status(500).json({ error: 'Error obteniendo los tickets' });
        } else {
            res.json(results);
        }
    });
};

// Obtener ticket por ID
exports.getTicketById = (req, res) => {
    const query = 'SELECT * FROM Tickets WHERE id = ?';
    const { id } = req.params;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error obteniendo el ticket:', err);
            res.status(500).json({ error: 'Error obteniendo el ticket' });
        } else {
            res.json(results[0] || null); // Devolver null si no se encuentra el ticket
        }
    });
};

// Crear nuevo ticket
exports.createTicket = (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado_ticket_id } = req.body;
    const query = 'INSERT INTO Tickets (codigo_ticket, usuario_id, evento_id, estado_ticket_id) VALUES (?, ?, ?, ?)';
    db.query(query, [codigo_ticket, usuario_id, evento_id, estado_ticket_id], (err, results) => {
        if (err) {
            console.error('Error creando el ticket:', err);
            res.status(500).json({ error: 'Error creando el ticket' });
        } else {
            res.status(201).json({ message: 'Ticket creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar ticket
exports.updateTicket = (req, res) => {
    const { codigo_ticket, usuario_id, evento_id, estado_ticket_id } = req.body;
    const { id } = req.params;
    const query = 'UPDATE Tickets SET codigo_ticket = ?, usuario_id = ?, evento_id = ?, estado_ticket_id = ? WHERE id = ?';
    db.query(query, [codigo_ticket, usuario_id, evento_id, estado_ticket_id, id], (err, results) => {
        if (err) {
            console.error('Error actualizando el ticket:', err);
            res.status(500).json({ error: 'Error actualizando el ticket' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Ticket no encontrado' });
        } else {
            res.json({ message: 'Ticket actualizado con éxito' });
        }
    });
};

// Eliminar ticket
exports.deleteTicket = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Tickets WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error eliminando el ticket:', err);
            res.status(500).json({ error: 'Error eliminando el ticket' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Ticket no encontrado' });
        } else {
            res.json({ message: 'Ticket eliminado con éxito' });
        }
    });
};
