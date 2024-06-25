const express = require('express');
const router = express.Router();
const PersonasController = require('../controller/personasController');
const verifyToken = require('../middleware/LoginMiddleware');

// Middleware para proteger las rutas de Personas
router.use(verifyToken);

// Rutas CRUD de Personas
router.get('/Listar', PersonasController.ListarPersonas); // Listar personas
router.post('/AgregarPersona', PersonasController.AgregarPersona); // Agregar persona
router.put('/ModificarPersona/:id', PersonasController.ModificarPersona); // Modificar persona
router.delete('/EliminarPersona/:id', PersonasController.EliminarPersona); // Eliminar persona

module.exports = router;
