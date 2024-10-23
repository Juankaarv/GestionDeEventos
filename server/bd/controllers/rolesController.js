const db = require('../../db');

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Roles');
        res.json(results);
    } catch (err) {
        console.error('Error obteniendo los roles:', err);
        res.status(500).json({ error: 'Error obteniendo los roles' });
    }
};

// Obtener rol por ID
exports.getRolById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM Roles WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error obteniendo el rol:', err);
        res.status(500).json({ error: 'Error obteniendo el rol' });
    }
};

// Crear nuevo rol
exports.createRol = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [results] = await db.query('INSERT INTO Roles (nombre) VALUES (?)', [nombre]);
        res.status(201).json({ message: 'Rol creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el rol:', err);
        res.status(500).json({ error: 'Error creando el rol' });
    }
};

// Actualizar rol
exports.updateRol = async (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        const [results] = await db.query('UPDATE Roles SET nombre = ? WHERE id = ?', [nombre, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el rol:', err);
        res.status(500).json({ error: 'Error actualizando el rol' });
    }
};

// Eliminar rol
exports.deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE Roles SET activo = FALSE WHERE id = ?';
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol marcado como inactivo' });
    } catch (err) {
        console.error('Error marcando el rol como inactivo:', err);
        res.status(500).json({ error: 'Error marcando el rol como inactivo' });
    }
};
