// server/index.js
const express = require('express');
const cors = require('cors');  // Importar el módulo cors

// Importar rutas
const usuariosRoutes = require('./bd/routes/usuarios');
const eventosRoutes = require('./bd/routes/eventos');
const rolesRoutes = require('./bd/routes/roles');
const ticketsRoutes = require('./bd/routes/tickets');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permitir solicitudes desde otros dominios
app.use(express.json()); // Para procesar datos JSON en las solicitudes

// Ruta para la raíz "/"
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Usar las rutas importadas para manejar los CRUDs
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/tickets', ticketsRoutes);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT} :D`);
});
