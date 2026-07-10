const Usuario = require('../models/Usuario');

// Crear un nuevo usuario (Registro)
const registrarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            usuario: usuarioGuardado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

module.exports = {
    registrarUsuario,
    obtenerUsuarios
};