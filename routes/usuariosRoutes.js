// usuariosRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/usuariosController');
const verifyToken = require('../middleware/LoginMiddleware');

// Middleware para proteger las rutas de usuarios
//router.use(verifyToken);

// Rutas CRUD de usuarios
router.get('/', userController.ObtenerUsuarios); // Obtener todos los usuarios
router.post('/AgregarUsuario/', userController.AgregarUsuario); // Agregar un nuevo usuario
router.get('/ObtenerUsuario/:persona_id', userController.ObtenerUsuarioId); // Obtener usuario por ID
router.put('/ModificarUsuario/:persona_id', userController.ModificarUsuario); // Modificar usuario por ID
router.delete('/EliminarUsuario/:persona_id', userController.EliminarUsuario); // Eliminar usuario por ID

module.exports = router;
