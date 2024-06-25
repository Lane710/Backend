const express = require('express');
const router = express.Router();
const authController = require('../controller/LoginController');

router.post('/login', authController.login);
module.exports = router;