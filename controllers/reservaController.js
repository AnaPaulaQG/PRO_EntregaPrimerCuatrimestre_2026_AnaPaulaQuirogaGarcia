const Reserva = require('../models/Reserva');

const crearReserva = async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        res.status(201).json({ 
            mensaje: 'Tu reserva se guardó correctamente. Estarás en lista de espera y recibirás un email con la confirmación',
            reserva: nuevaReserva 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar la reserva', error: error.message });
    }
};

module.exports = { crearReserva };