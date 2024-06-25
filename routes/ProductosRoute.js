//ProductosRoute.js
const express = require('express');
const router = express.Router();
const ProductosController = require('../controller/ProductosController');
const verifyToken = require('../middleware/LoginMiddleware');
// Middleware para proteger las rutas de Productos
router.use(verifyToken);

// Rutas CRUD de Productos
router.get('/Listar/', ProductosController.ListarProductos); // Listar a los productos
router.post('/AgregarProducto/', ProductosController.AgregarProducto); // Agregar Productos
router.put('/ModificarProducto/:id', ProductosController.ModificarProducto); // Modificar producto
router.delete('/EliminarProducto/:id', ProductosController.EliminarProducto); // Eliminar producto
module.exports = router;
