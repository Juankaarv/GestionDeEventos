const db = require('../../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
    const { correo_electronico } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Configurar nodemailer
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jhosimarpc@gmail.com',
                pass: 'ztuk zivk fnop zeim'
            }
        });

        let mailOptions = {
            from: 'jhosimarpc@gmail.com',
            to: correo_electronico,
            subject: 'Restablecimiento de contraseña',
            text: 'Haga clic en este enlace para restablecer su contraseña: http://localhost:3000/reset-password'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error enviando el correo' });
            }
            res.json({ message: 'Correo enviado con éxito' });
        });

    } catch (err) {
        console.error('Error al enviar el enlace:', err);
        res.status(500).json({ error: 'Error al enviar el enlace de restablecimiento' });
    }
};
// Función para encriptar contraseñas usando crypto
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex'); // Usar SHA-256 para generar un hash
};

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Usuarios');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo los usuarios' });
    }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo el usuario' });
    }
};

// Crear nuevo usuario con contraseña encriptada usando crypto
exports.createUsuario = async (req, res) => {
    const { nombre, correo_electronico, contrasena, carnet, rol_id } = req.body;

    if (!nombre || !correo_electronico || !contrasena) {
        return res.status(400).json({ error: 'Nombre, correo electrónico y contraseña son obligatorios' });
    }

    try {
        // Encriptar la contraseña usando SHA-256
        const hashedPassword = hashPassword(contrasena);

        const query = 'INSERT INTO Usuarios (nombre, correo_electronico, contrasena, carnet, rol_id) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [nombre, correo_electronico, hashedPassword, carnet, rol_id]);

        res.json({ message: 'Usuario creado con éxito', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creando el usuario' });
    }
};

// Actualizar usuario con nueva contraseña encriptada
exports.updateUsuario = async (req, res) => {
    const { nombre, correo_electronico, contrasena, carnet, rol_id } = req.body;

    try {
        // Encriptar la nueva contraseña
        const hashedPassword = hashPassword(contrasena);

        const query = 'UPDATE Usuarios SET nombre = ?, correo_electronico = ?, contrasena = ?, carnet = ?, rol_id = ? WHERE id = ?';
        await db.query(query, [nombre, correo_electronico, hashedPassword, carnet, rol_id, req.params.id]);

        res.json({ message: 'Usuario actualizado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error actualizando el usuario' });
    }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const query = 'DELETE FROM Usuarios WHERE id = ?';
        await db.query(query, [req.params.id]);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error eliminando el usuario' });
    }
};



// server/bd/controllers/usuariosController.js
exports.forgotPassword = async (req, res) => {
    const { correo_electronico } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Aquí es donde enviarías el enlace de restablecimiento de contraseña
        // Puedes usar nodemailer u otro servicio para enviar correos electrónicos
        // Por ejemplo, generar un token y enviarlo por correo electrónico

        res.json({ message: 'Enlace de restablecimiento enviado' });
    } catch (err) {
        console.error('Error al enviar el enlace:', err);
        res.status(500).json({ error: 'Error al enviar el enlace de restablecimiento' });
    }
};




// Iniciar sesión (Login)
exports.loginUsuario = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    if (!correo_electronico || !contrasena) {
        return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
    }

    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const usuario = results[0];

        // Encriptar la contraseña ingresada para compararla con la almacenada
        const hashedPassword = hashPassword(contrasena);
        if (hashedPassword !== usuario.contrasena) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: usuario.id, correo_electronico: usuario.correo_electronico }, 'secreto', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};