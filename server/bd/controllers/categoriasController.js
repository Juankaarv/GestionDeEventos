const db = require('../../db');

// Obtener todas las categorías de eventos
exports.getAllCategorias = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT CategoriaEventos.id, CategoriaEventos.nombre, CategoriaEventos.descripcion, TipoEventos.nombre AS tipo_evento 
            FROM CategoriaEventos
            JOIN TipoEventos ON CategoriaEventos.tipo_evento_id = TipoEventos.id
        `);
        res.json(results);
    } catch (err) {
        console.error('Error obteniendo las categorías:', err);
        res.status(500).json({ error: 'Error obteniendo las categorías' });
    }
};
