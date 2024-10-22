// server/bd/controllers/eventosController.js
const db = require('../../db');

// Obtener todos los eventos
exports.getAllEventos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Eventos');
        res.json(results);
    } catch (err) {
        console.error('Error obteniendo los eventos:', err);
        res.status(500).json({ error: 'Error obteniendo los eventos' });
    }
};

// Obtener evento por ID
exports.getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM Eventos WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error obteniendo el evento:', err);
        res.status(500).json({ error: 'Error obteniendo el evento' });
    }
};

// Crear nuevo evento
exports.createEvento = async (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    try {
        const query = 'INSERT INTO Eventos (titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible]);
        res.status(201).json({ message: 'Evento creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el evento:', err);
        res.status(500).json({ error: 'Error creando el evento' });
    }
};

// Actualizar evento
exports.updateEvento = async (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    const { id } = req.params;
    try {
        const query = 'UPDATE Eventos SET titulo = ?, descripcion = ?, ubicacion = ?, fecha_hora = ?, precio = ?, cupo_disponible = ? WHERE id = ?';
        const [results] = await db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el evento:', err);
        res.status(500).json({ error: 'Error actualizando el evento' });
    }
};

// Eliminar evento
exports.deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE Eventos SET activo = FALSE WHERE id = ?';
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento marcado como inactivo' });
    } catch (err) {
        console.error('Error marcando el evento como inactivo:', err);
        res.status(500).json({ error: 'Error marcando el evento como inactivo' });
    }
};