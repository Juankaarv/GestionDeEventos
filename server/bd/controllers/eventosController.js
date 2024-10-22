const db = require('../../index');  
// Obtener todos los eventos
exports.getAllEventos = (req, res) => {
    const query = 'SELECT * FROM Eventos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo los eventos:', err);
            res.status(500).json({ error: 'Error obteniendo los eventos' });
        } else {
            res.json(results);
        }
    });
};

// Obtener evento por ID
exports.getEventoById = (req, res) => {
    const query = 'SELECT * FROM Eventos WHERE id = ?';
    const { id } = req.params;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error obteniendo el evento:', err);
            res.status(500).json({ error: 'Error obteniendo el evento' });
        } else {
            res.json(results[0] || null); // Devolver null si no se encuentra el evento
        }
    });
};

// Crear nuevo evento
exports.createEvento = (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    const query = 'INSERT INTO Eventos (titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible], (err, results) => {
        if (err) {
            console.error('Error creando el evento:', err);
            res.status(500).json({ error: 'Error creando el evento' });
        } else {
            res.status(201).json({ message: 'Evento creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar evento
exports.updateEvento = (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    const { id } = req.params;
    const query = 'UPDATE Eventos SET titulo = ?, descripcion = ?, ubicacion = ?, fecha_hora = ?, precio = ?, cupo_disponible = ? WHERE id = ?';
    db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible, id], (err, results) => {
        if (err) {
            console.error('Error actualizando el evento:', err);
            res.status(500).json({ error: 'Error actualizando el evento' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Evento no encontrado' });
        } else {
            res.json({ message: 'Evento actualizado con éxito' });
        }
    });
};

// Eliminar evento
exports.deleteEvento = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Eventos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error eliminando el evento:', err);
            res.status(500).json({ error: 'Error eliminando el evento' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Evento no encontrado' });
        } else {
            res.json({ message: 'Evento eliminado con éxito' });
        }
    });
};
