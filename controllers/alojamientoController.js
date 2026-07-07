const Alojamiento = require('../models/Alojamiento');

// Función para crear un nuevo alojamiento
const crearAlojamiento = async (req, res) => {
    try {
        // req.body contiene los datos (título, precio, etc.) que enviamos desde el frontend o postman
        const nuevoAlojamiento = new Alojamiento(req.body); 
        
        // Lo guardamos en MongoDB Atlas
        const alojamientoGuardado = await nuevoAlojamiento.save();

        // Respondemos que todo salió bien (Status 201: Creado)
        res.status(201).json({
            mensaje: 'Alojamiento creado con éxito',
            alojamiento: alojamientoGuardado
        });
    } catch (error) {
        // Si falta algún dato obligatorio, capturamos el error
        res.status(500).json({
            mensaje: 'Hubo un error al crear el alojamiento',
            error: error.message
        });
    }
};

// Exportamos la función para usarla en las rutas
module.exports = {
    crearAlojamiento
};