const db = require('../../index');  
// Obtener todos los eventos
exports.getAllEventos = (req, res) => {
    const query = 'SELECT * FROM Eventos';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo los eventos' });
        } else {
            res.json(results);
        }
    });
};

// Obtener evento por ID
exports.getEventoById = (req, res) => {
    const query = 'SELECT * FROM Eventos WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo el evento' });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear nuevo evento
exports.createEvento = (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    const query = 'INSERT INTO Eventos (titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creando el evento' });
        } else {
            res.json({ message: 'Evento creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar evento
exports.updateEvento = (req, res) => {
    const { titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible } = req.body;
    const query = 'UPDATE Eventos SET titulo = ?, descripcion = ?, ubicacion = ?, fecha_hora = ?, precio = ?, cupo_disponible = ? WHERE id = ?';
    db.query(query, [titulo, descripcion, ubicacion, fecha_hora, precio, cupo_disponible, req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error actualizando el evento' });
        } else {
            res.json({ message: 'Evento actualizado con éxito' });
        }
    });
};

// Eliminar evento
exports.deleteEvento = (req, res) => {
    const query = 'DELETE FROM Eventos WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error eliminando el evento' });
        } else {
            res.json({ message: 'Evento eliminado con éxito' });
        }
    });
};
