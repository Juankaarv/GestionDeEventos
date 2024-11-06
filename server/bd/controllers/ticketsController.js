// server/bd/controllers/ticketsController.js
const db = require('../../db');

// Obtener todos los tickets activos
exports.getAllTickets = async (req, res) => {
    try {
        // Seleccionar solo tickets activos
        const [results] = await db.query('SELECT * FROM TipoTickets WHERE activo = TRUE');
        res.json(results);
    } catch (err) {
        console.error('Error obteniendo los tickets:', err);
        res.status(500).json({ error: 'Error obteniendo los tickets' });
    }
};

// Obtener ticket por ID si está activo
exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM TipoTickets WHERE id = ? AND activo = TRUE', [id]);
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
    const { nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id } = req.body;
    try {
        const query = `
            INSERT INTO TipoTickets 
            (nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
        const [results] = await db.query(query, [nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id]);
        res.status(201).json({ message: 'Ticket creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el ticket:', err);
        res.status(500).json({ error: 'Error creando el ticket' });
    }
};

// Actualizar ticket
exports.updateTicket = async (req, res) => {
    const { nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id } = req.body;
    const { id } = req.params;
    try {
        const query = `
            UPDATE TipoTickets SET 
            nombre = ?, es_de_pago = ?, precio = ?, limite_compra = ?, stock = ?, fecha_inicio_venta = ?, fecha_final_venta = ?, es_por_fecha = ?, evento_id = ? 
            WHERE id = ? AND activo = TRUE`;
        
        const [results] = await db.query(query, [nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id, id]);
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado o inactivo' });
        }
        
        res.json({ message: 'Ticket actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el ticket:', err);
        res.status(500).json({ error: 'Error actualizando el ticket' });
    }
};

// Marcar ticket como inactivo en lugar de eliminarlo
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE TipoTickets SET activo = FALSE WHERE id = ?';
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