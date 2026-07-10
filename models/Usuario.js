const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true // Borra los espacios en blanco al principio y al final
    },

    dni: {
        type: String,
        required: true,
        unique: true, // Para evitar que usen el mismo DNI en dos cuentas
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true, // Esto es clave: Mongo no dejará crear dos usuarios con el mismo email
        trim: true,
        lowercase: true // Convierte todo a minúsculas por las dudas
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['huesped', 'anfitrion', 'admin'], // Valida que solo se puedan usar estas 3 palabras
        default: 'huesped'
    },
    activo: {
        type: Boolean,
        default: true // Listo para nuestra futura baja lógica
    }
}, {
    timestamps: true // Nos crea automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Usuario', usuarioSchema);