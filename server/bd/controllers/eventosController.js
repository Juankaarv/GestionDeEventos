// server/bd/controllers/eventosController.js
const db = require('../../db');

// Obtener todos los eventos
exports.getAllEventos = async (req, res) => {
    try {
        // Obtener los eventos
        const queryEventos = `
            SELECT 
                E.id AS evento_id,
                E.titulo,
                E.descripcion,
                E.url,
                E.organizadores,
                E.ubicacion,
                E.fecha_hora,
                E.precio_base,
                E.cupo_disponible,
                E.es_evento_virtual,
                E.url_transmision,
                E.plataforma_virtual,
                E.fecha_creacion,
                E.fecha_modificacion,
                E.activo AS evento_activo,
                CE.nombre AS categoria_evento,
                CE.descripcion AS categoria_evento_desc,
                TE.nombre AS tipo_evento,
                TE.descripcion AS tipo_evento_desc
            FROM Eventos E
            JOIN CategoriaEventos CE ON E.categoria_evento_id = CE.id
            JOIN TipoEventos TE ON CE.tipo_evento_id = TE.id
            WHERE E.activo = TRUE
        `;
        const [eventos] = await db.query(queryEventos);

        // Obtener los tickets y zonas relacionados
        const eventoIds = eventos.map(evento => evento.evento_id);
        const queryTickets = `
            SELECT 
                TT.evento_id,
                TT.nombre AS tipo_ticket,
                TT.es_de_pago,
                TT.precio,
                TT.fecha_inicio_venta,
                TT.fecha_final_venta
            FROM TipoTickets TT
            WHERE TT.evento_id IN (?)
        `;
        const [tickets] = await db.query(queryTickets, [eventoIds]);

        const queryZonas = `
            SELECT 
                Z.evento_id,
                Z.nombre AS zona,
                Z.capacidad AS zona_capacidad,
                Z.precio_extra AS zona_precio_extra
            FROM Zonas Z
            WHERE Z.evento_id IN (?)
        `;
        const [zonas] = await db.query(queryZonas, [eventoIds]);

        // Agrupar los tickets y zonas por evento
        eventos.forEach(evento => {
            evento.tickets = tickets.filter(ticket => ticket.evento_id === evento.evento_id);
            evento.zonas = zonas.filter(zona => zona.evento_id === evento.evento_id);
        });

        // Devolver los resultados sin duplicados
        res.json(eventos);
    } catch (err) {
        console.error('Error obteniendo los eventos:', err);
        res.status(500).json({ error: 'Error obteniendo los eventos' });
    }
};


// Obtener evento por ID
exports.getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                E.id AS evento_id,
                E.titulo,
                E.descripcion,
                E.url,
                E.organizadores,
                E.ubicacion,
                E.fecha_hora,
                E.precio_base,
                E.cupo_disponible,
                E.es_evento_virtual,
                E.url_transmision,
                E.plataforma_virtual,
                E.fecha_creacion,
                E.fecha_modificacion,
                E.activo AS evento_activo,
                CE.nombre AS categoria_evento,
                CE.descripcion AS categoria_evento_desc,
                TE.nombre AS tipo_evento,
                TE.descripcion AS tipo_evento_desc,
                TT.nombre AS tipo_ticket,
                TT.es_de_pago,
                TT.precio,
                TT.fecha_inicio_venta,
                TT.fecha_final_venta,
                Z.nombre AS zona,
                Z.capacidad AS zona_capacidad,
                Z.precio_extra AS zona_precio_extra
            FROM Eventos E
            JOIN CategoriaEventos CE ON E.categoria_evento_id = CE.id
            JOIN TipoEventos TE ON CE.tipo_evento_id = TE.id
            LEFT JOIN TipoTickets TT ON E.id = TT.evento_id
            LEFT JOIN Zonas Z ON E.id = Z.evento_id
            WHERE E.id = ? AND E.activo = TRUE
        `;
        const [results] = await db.query(query, [id]);
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [results] = await db.query(query, [
            categoria_evento_id, titulo, url, descripcion, organizadores, 
            ubicacion, fecha_hora, precio_base, cupo_disponible, 
            es_evento_virtual, url_transmision, plataforma_virtual
        ]);

        // Si el evento tiene tickets, insertar en la tabla TipoTickets
        if (req.body.tickets) {
            // Lógica para insertar los tickets relacionados
        }
        
        res.status(201).json({ message: 'Evento creado con éxito', id: results.insertId });
    } catch (err) {
        console.error('Error creando el evento:', err);
        res.status(500).json({ error: 'Error creando el evento' });
    }
};

// Actualizar evento (actualizar todos los campos excepto el aforo)
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
        es_evento_virtual, 
        url_transmision, 
        plataforma_virtual, 
        cupo_disponible  
    } = req.body;
    
    const { id } = req.params;
    
    try {
        // Actualizar solo los campos del evento
        const queryEvento = `
            UPDATE Eventos SET 
                categoria_evento_id = ?, 
                titulo = ?, 
                url = ?, 
                descripcion = ?, 
                organizadores = ?, 
                ubicacion = ?, 
                fecha_hora = ?, 
                precio_base = ?, 
                es_evento_virtual = ?, 
                url_transmision = ?, 
                plataforma_virtual = ?, 
                cupo_disponible = ?  
            WHERE id = ? AND activo = TRUE
        `;
        const [resultsEvento] = await db.query(queryEvento, [
            categoria_evento_id, 
            titulo, 
            url, 
            descripcion, 
            organizadores, 
            ubicacion, 
            fecha_hora, 
            precio_base, 
            es_evento_virtual, 
            url_transmision, 
            plataforma_virtual, 
            cupo_disponible,  
            id
        ]);

        if (resultsEvento.affectedRows === 0) {
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