const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar (POST) y para listar (GET)
router.post('/', usuarioController.registrarUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id', usuarioController.modificarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;