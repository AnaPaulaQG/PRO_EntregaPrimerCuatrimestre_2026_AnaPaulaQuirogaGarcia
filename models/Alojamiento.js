const mongoose = require('mongoose');

// Definimos el esquema (la estructura lógica de nuestro documento)
const alojamientoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true, // Es obligatorio
        trim: true // Borra espacios en blanco al principio y al final
    },
    descripcion: {
        type: String,
        required: true
    },
    precioPorNoche: {
        type: Number,
        required: true,
        min: 0 // Evita que se ingresen precios negativos
    },
    comodidades: {
        type: [String], // Un array de textos
        default: []
    },
    activo: {
        type: Boolean,
        default: true // Por defecto está activo. Si se cambia a false, es una "baja lógica"
    },
    anfitrion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Esto conecta con el modelo de Usuario
    required: true
}
}, {
    timestamps: true // Agrega automáticamente la fecha de creación y modificación
});

// Exportamos el modelo para poder usarlo en los controladores
module.exports = mongoose.model('Alojamiento', alojamientoSchema);