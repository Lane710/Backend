const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Para usar variables de entorno

const app = express();
const authRoutes = require('./routes/LoginRoute');
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/ProductosRoute');
const personasRoutes = require('./routes/PersonasRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/personas', personasRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});