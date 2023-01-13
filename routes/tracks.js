// Rutas relacionadas a los 'tracks'

const express = require('express');
const router = express.Router(); // Para manejar las rutas
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const authMiddleware = require('../middlewares/auth');
const checkRolMiddleware = require('../middlewares/rol');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');


/* Definiendo las rutas */

// Ruta para acceder a los 'tracks'
// Implementando un 'middleware'
router.get('/', authMiddleware, getItems);

// Ruta para acceder a un 'track'
// Implementando un 'middleware'
// Implementando un validator
router.get('/:id', authMiddleware, validatorGetItem, getItem);

// Ruta para crear un nuevo 'track'
// Implementando dos 'middlewares'
// Implementando un validator
router.post('/', authMiddleware, checkRolMiddleware(['admin']), validatorCreateItem, createItem);

// Ruta para actualizar un 'track'
// Implementando un 'middleware'
// Implementando dos validators
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

// Ruta para eliminar un 'track'
// Implementando un 'middleware'
// Implementando un validator
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);


// Exportando el módulo

module.exports = router;





