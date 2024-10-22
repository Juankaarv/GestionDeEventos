const db = require('../../index');  

// Obtener todos los roles
exports.getAllRoles = (req, res) => {
    const query = 'SELECT * FROM Roles';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo los roles:', err);
            res.status(500).json({ error: 'Error obteniendo los roles' });
        } else {
            res.json(results);
        }
    });
};

// Obtener rol por ID
exports.getRolById = (req, res) => {
    const query = 'SELECT * FROM Roles WHERE id = ?';
    const { id } = req.params;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error obteniendo el rol:', err);
            res.status(500).json({ error: 'Error obteniendo el rol' });
        } else {
            res.json(results[0] || null); // Devolver null si no se encuentra el rol
        }
    });
};

// Crear nuevo rol
exports.createRol = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Roles (nombre) VALUES (?)';
    db.query(query, [nombre], (err, results) => {
        if (err) {
            console.error('Error creando el rol:', err);
            res.status(500).json({ error: 'Error creando el rol' });
        } else {
            res.status(201).json({ message: 'Rol creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar rol
exports.updateRol = (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    const query = 'UPDATE Roles SET nombre = ? WHERE id = ?';
    db.query(query, [nombre, id], (err, results) => {
        if (err) {
            console.error('Error actualizando el rol:', err);
            res.status(500).json({ error: 'Error actualizando el rol' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Rol no encontrado' });
        } else {
            res.json({ message: 'Rol actualizado con éxito' });
        }
    });
};

// Eliminar rol
exports.deleteRol = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Roles WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error eliminando el rol:', err);
            res.status(500).json({ error: 'Error eliminando el rol' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Rol no encontrado' });
        } else {
            res.json({ message: 'Rol eliminado con éxito' });
        }
    });
};
