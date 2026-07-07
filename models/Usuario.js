const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya dos cuentas con el mismo mail
        trim: true,
        lowercase: true // Guarda siempre el mail en minúsculas
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['huesped', 'anfitrion', 'admin'], // Solo acepta estos tres valores
        default: 'huesped' // Si no le especificamos rol al crearlo, es huésped por defecto
    },
    activo: {
        type: Boolean,
        default: true // También aplicamos la baja lógica para los usuarios
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);