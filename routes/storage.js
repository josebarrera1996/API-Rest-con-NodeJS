// Rutas relacionadas a los 'storages'

const express = require('express');
const router = express.Router(); // Para manejar las rutas
const uploadMiddleware = require('../utils/handleStorage');
const { getItems, getItem, createItem, deleteItem } = require('../controllers/storage'); // Importando los métodos del controller
const { validatorGetItem } = require('../validators/storage');

/* Definiendo las rutas */

// Ruta para poder acceder a todos los 'storage'
router.get('/', getItems);

// Ruta para poder acceder a un 'storage' en particular
// Implementando un validator
router.get('/:id', validatorGetItem, getItem);

// Ruta para poder crear un nuevo 'storage'
// Se utilizará el middleware para que agarre un archivo de los que se envía
// El argumento que se le pasará es el nombre de la propiedad en la cual viene el archivo
router.post('/', uploadMiddleware.single("myfile"), createItem);

// Ruta para poder eliminar un 'storage' en particular
// Implementando un validator
router.delete('/:id', validatorGetItem, deleteItem);


// Exportando el módulo
module.exports = router;