/* En este archivo se desarrollará las validaciones que el modelo 'Storage' debe de seguir */

const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/* Definiendo las validaciones */

// Validación a la hora de consuntar un item en específico
const validatorGetItem = [

    // Comprobando que la siguiente propiedad exista, que no esté vacía y que sea un ID de Mongo
    check('id').exists().notEmpty().isMongoId(),

    // Implementando el middleware para responder ante una petición
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


// Exportando los validators
module.exports = {
    validatorGetItem
};
