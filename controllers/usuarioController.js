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

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
    }
};

// Modificar usuario
const modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// Eliminar usuario (Baja lógica)
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // En lugar de borrar, cambiamos el estado activo a false
        const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true });
        
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario dado de baja correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al dar de baja', error: error.message });
    }
};

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    modificarUsuario,
    eliminarUsuario
};