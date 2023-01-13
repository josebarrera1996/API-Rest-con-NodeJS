/* En este archivo se desarrollará las validaciones que el modelo 'Users' debe de seguir */

const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/* Definiendo las validaciones */

// Validación a la hora de registrarse
const validateRegisterItem = [

    // Comprobando si los siguientes campos existen y más...
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("age").exists().notEmpty().isInt({ min: 12, max: 99 }), // { min: 12, max: 99 }
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 4, max: 15 }),

    // Implementando el middleware para responder ante una petición
    (req, res, next) => {
        validateResults(req, res, next);
    },
];

// Validación a la hora de logearse
const validateLoginItem = [

    // Comprobando si los siguientes campos existen y más...
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),

    // Implementando el middleware para responder ante una petición
    (req, res, next) => {
        validateResults(req, res, next);
    },
];


// Exportando los validators
module.exports = {
    validateRegisterItem,
    validateLoginItem
};
