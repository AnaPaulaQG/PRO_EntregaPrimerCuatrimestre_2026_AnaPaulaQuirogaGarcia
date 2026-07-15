const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    alojamientoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento', required: true },
    fechaReserva: { type: Date, default: Date.now },
    estado: { type: String, default: 'pendiente' } // 'pendiente', 'confirmada', 'cancelada'
});

module.exports = mongoose.model('Reserva', reservaSchema);