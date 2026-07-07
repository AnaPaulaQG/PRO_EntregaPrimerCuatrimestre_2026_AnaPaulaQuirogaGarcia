const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Importamos Mongoose

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// --- AGREGAR ESTO ---
// Importamos y usamos las rutas de alojamientos
const alojamientoRoutes = require('./routes/alojamientoRoutes');
app.use('/api/alojamientos', alojamientoRoutes);
// --------------------

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a la base de datos MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de alojamientos listo y funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});