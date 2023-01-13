// Rutas relacionadas a los 'users' y a la propia autentificación

const express = require('express');
const router = express.Router(); // Para manejar las rutas
const { validateRegisterItem, validateLoginItem } = require('../validators/auth');
const { registerCtrl, loginCtrl } = require('../controllers/auth');

/* Definiendo las rutas */

// Ruta para poder registrar un nuevo 'user'
// Implementando un validator
router.post('/register', validateRegisterItem, registerCtrl);

// Ruta para que un 'user' se pueda logear
// Implementando un validator
router.post('/login', validateLoginItem, loginCtrl);

// Exportando el módulo
module.exports = router;