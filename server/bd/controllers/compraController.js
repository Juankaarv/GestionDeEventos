const db = require('../../db');  // Conexión a la base de datos

// Controlador para registrar la compra
exports.registrarCompra = async (req, res) => {
  const { zonaId, usuarioId, metodoPago, total } = req.body;

  // Validar los datos necesarios
  if (!zonaId || !usuarioId || !metodoPago || !total) {
    return res.status(400).json({ error: 'Faltan datos requeridos para la compra.' });
  }

  try {
    // Registrar la compra en la base de datos
    const query = `
      INSERT INTO Compras (zona_id, usuario_id, metodo_pago, total, fecha)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await db.query(query, [zonaId, usuarioId, metodoPago, total]);

    // Responder con el ID de la compra registrada
    res.status(201).json({ message: 'Compra registrada con éxito', compraId: result.insertId });
  } catch (err) {
    console.error('Error al registrar la compra:', err);
    res.status(500).json({ error: 'Error al registrar la compra' });
  }
};
