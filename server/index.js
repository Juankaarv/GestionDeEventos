const express = require('express');
const cors = require('cors');  // Importar el módulo cors

// Importar rutas
const usuariosRoutes = require('./bd/routes/usuarios');
const eventosRoutes = require('./bd/routes/eventos');
const rolesRoutes = require('./bd/routes/roles');
const ticketsRoutes = require('./bd/routes/tickets');
const categoriasRoutes = require('./bd/routes/categorias');
const zonasRoutes = require('./bd/routes/zonas')
const asientosRoutes = require('./bd/routes/asientos')
const zonascompraRoutes = require('./bd/routes/zonascompra')

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
app.use('/api/categorias', categoriasRoutes);
app.use('/api/zonas', zonasRoutes);
app.use('/api/asientos', asientosRoutes);
app.use('/api/zonascompra', zonascompraRoutes);


// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT} :D`);
});
