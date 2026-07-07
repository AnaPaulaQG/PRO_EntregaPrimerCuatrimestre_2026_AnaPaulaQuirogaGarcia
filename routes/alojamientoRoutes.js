const express = require('express');
const router = express.Router();
const alojamientoController = require('../controllers/alojamientoController');

// Definimos la ruta POST (usada para crear/enviar datos nuevos)
// La URL final será algo como: http://localhost:3000/api/alojamientos
router.post('/', alojamientoController.crearAlojamiento);

module.exports = router;