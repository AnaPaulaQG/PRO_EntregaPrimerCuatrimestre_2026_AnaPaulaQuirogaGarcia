const Alojamiento = require('../models/Alojamiento');

// Función para crear un nuevo alojamiento
const crearAlojamiento = async (req, res) => {
    try {
        
    if (!req.body.titulo || req.body.titulo.trim() === "") {
    return res.status(400).json({ mensaje: 'El título es obligatorio' });
}
    // Ejemplo rápido para validar precio en el POST de alojamiento
        if (req.body.precioPorNoche < 0) {
    return res.status(400).json({ mensaje: 'El precio no puede ser negativo' });
        }
        const nuevoAlojamiento = new Alojamiento(req.body); 
        const alojamientoGuardado = await nuevoAlojamiento.save();

        res.status(201).json({
            mensaje: 'Alojamiento creado con éxito',
            alojamiento: alojamientoGuardado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Hubo un error al crear el alojamiento',
            error: error.message
        });
    }
};

// Función para obtener todos los alojamientos
const obtenerAlojamientos = async (req, res) => {
    try {
        const alojamientos = await Alojamiento.find();
        res.status(200).json(alojamientos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Hubo un error al obtener los alojamientos',
            error: error.message
        });
    }
};

// Obtener un alojamiento por su ID
const obtenerAlojamientoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await Alojamiento.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }

        res.status(200).json(alojamiento);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el alojamiento',
            error: error.message
        });
    }
};

const modificarAlojamiento = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID específico que viene en la URL
        const datosActualizados = req.body; // Los nuevos datos que armamos en Thunder Client

        // Buscamos el alojamiento por su ID y lo actualizamos. 
        // El { new: true } le dice a Mongo que nos devuelva la versión ya modificada.
        const alojamientoActualizado = await Alojamiento.findByIdAndUpdate(id, datosActualizados, { new: true });

        // Si mandamos un ID que no existe, atajamos el error
        if (!alojamientoActualizado) {
            return res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }

        res.status(200).json({
            mensaje: 'Alojamiento actualizado correctamente',
            alojamiento: alojamientoActualizado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Hubo un error al actualizar el alojamiento',
            error: error.message
        });
    }
};

// Función para dar de baja un alojamiento (DELETE Lógico)
const eliminarAlojamiento = async (req, res) => {
    try {
        const { id } = req.params; // Sacamos el ID de la URL

        // En lugar de borrarlo, actualizamos el campo 'activo' a false
        const alojamientoEliminado = await Alojamiento.findByIdAndUpdate(
            id, 
            { activo: false }, 
            { returnDocument: 'after' } 
        );

        if (!alojamientoEliminado) {
            return res.status(404).json({ mensaje: 'Alojamiento no encontrado' });
        }

        res.status(200).json({
            mensaje: 'Alojamiento dado de baja correctamente',
            alojamiento: alojamientoEliminado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Hubo un error al eliminar el alojamiento',
            error: error.message
        });
    }
};

// Exportamos ambas funciones
module.exports = {
    crearAlojamiento,
    obtenerAlojamientos,
    obtenerAlojamientoPorId,
    modificarAlojamiento,
    eliminarAlojamiento
};