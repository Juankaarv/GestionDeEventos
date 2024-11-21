// routes/eventosRoutes.js
const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

// Definir las rutas para el CRUD de eventos
router.get('/', eventosController.getAllEventos);




router.get('/:id', eventosController.getEventoById);
router.post('/', eventosController.createEvento);
router.put('/:id', eventosController.updateEvento);
router.delete('/:id', eventosController.deleteEvento);

module.exports = router;
