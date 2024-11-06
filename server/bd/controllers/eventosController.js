// server/bd/controllers/eventosController.js
const db = require('../../db');

// Obtener todos los eventos
exports.getAllEventos = async (req, res) => {
    try {
        // Seleccionar solo eventos activos
        const [results] = await db.query('SELECT * FROM Eventos WHERE activo = TRUE');
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
        const [results] = await db.query('SELECT * FROM Eventos WHERE id = ? AND activo = TRUE', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error obteniendo el evento:', err);
        res.status(500).json({ error: 'Error obteniendo el evento' });
    }
};

// Crear nuevo evento (sin cambios necesarios)
exports.createEvento = async (req, res) => {
    const { 
        categoria_evento_id, 
        titulo, 
        url, 
        descripcion, 
        organizadores, 
        ubicacion, 
        fecha_hora, 
        precio_base, 
        cupo_disponible, 
        es_evento_virtual, 
        url_transmision, 
        plataforma_virtual 
    } = req.body;
    
    try {
        const query = `
            INSERT INTO Eventos (
                categoria_evento_id, titulo, url, descripcion, organizadores, 
                ubicacion, fecha_hora, precio_base, cupo_disponible, 
                es_evento_virtual, url_transmision, plataforma_virtual
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
        const [results] = await db.query(query, [
            categoria_evento_id, titulo, url, descripcion, organizadores, 
            ubicacion, fecha_hora, precio_base, cupo_disponible, 
            es_evento_virtual, url_transmision, plataforma_virtual
        ]);
        
        res.status(201).json({ message: 'Evento creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el evento:', err);
        res.status(500).json({ error: 'Error creando el evento' });
    }
};

// Actualizar evento (sin cambios necesarios)
exports.updateEvento = async (req, res) => {
    const { 
        categoria_evento_id, 
        titulo, 
        url, 
        descripcion, 
        organizadores, 
        ubicacion, 
        fecha_hora, 
        precio_base, 
        cupo_disponible, 
        es_evento_virtual, 
        url_transmision, 
        plataforma_virtual 
    } = req.body;
    
    const { id } = req.params;
    
    try {
        const query = `
            UPDATE Eventos SET 
                categoria_evento_id = ?, titulo = ?, url = ?, descripcion = ?, organizadores = ?, 
                ubicacion = ?, fecha_hora = ?, precio_base = ?, cupo_disponible = ?, 
                es_evento_virtual = ?, url_transmision = ?, plataforma_virtual = ?
            WHERE id = ? AND activo = TRUE`;
            
        const [results] = await db.query(query, [
            categoria_evento_id, titulo, url, descripcion, organizadores, 
            ubicacion, fecha_hora, precio_base, cupo_disponible, 
            es_evento_virtual, url_transmision, plataforma_virtual, id
        ]);
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento no encontrado o inactivo' });
        }
        
        res.json({ message: 'Evento actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el evento:', err);
        res.status(500).json({ error: 'Error actualizando el evento' });
    }
};

// Marcar evento como inactivo en lugar de eliminarlo
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