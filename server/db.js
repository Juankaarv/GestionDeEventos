const mysql = require('mysql2/promise'); // Cambiar a 'mysql2/promise' para promesas

// Configurar la conexión a la base de datos MySQL utilizando un pool de conexiones
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Random619@#',
  database: 'sistema_eventos02',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;
