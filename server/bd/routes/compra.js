const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// Registrar la compra
router.post('/comprar', compraController.registrarCompra);

module.exports = router;
