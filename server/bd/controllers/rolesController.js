// server/bd/controllers/rolesController.js
const db = require('../../index');  // Importa la conexión desde index.js

// Obtener todos los roles
exports.getAllRoles = (req, res) => {
    const query = 'SELECT * FROM Roles';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo los roles' });
        } else {
            res.json(results);
        }
    });
};

// Obtener rol por ID
exports.getRolById = (req, res) => {
    const query = 'SELECT * FROM Roles WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error obteniendo el rol' });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear nuevo rol
exports.createRol = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Roles (nombre) VALUES (?)';
    db.query(query, [nombre], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creando el rol' });
        } else {
            res.json({ message: 'Rol creado con éxito', id: results.insertId });
        }
    });
};

// Actualizar rol
exports.updateRol = (req, res) => {
    const { nombre } = req.body;
    const query = 'UPDATE Roles SET nombre = ? WHERE id = ?';
    db.query(query, [nombre, req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error actualizando el rol' });
        } else {
            res.json({ message: 'Rol actualizado con éxito' });
        }
    });
};

// Eliminar rol
exports.deleteRol = (req, res) => {
    const query = 'DELETE FROM Roles WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error eliminando el rol' });
        } else {
            res.json({ message: 'Rol eliminado con éxito' });
        }
    });
};
