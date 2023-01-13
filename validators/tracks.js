/* En este archivo se desarrollará las validaciones que el modelo 'Tracks' debe de seguir */

const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/* Definiendo las validaciones */

// Validación para tratar en la creación de items
// Nos guiaremos de los campos del modelo
const validatorCreateItem = [

    // Comprobando que existen las siguientes propiedades (y de que no estén vacías)
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty(),

    // Comprobando que existen las siguientes propiedades (y de que no estén vacías) de un objeto anidado
    check('artist').exists().notEmpty(),
    check('artist.name').exists().notEmpty(),
    check('artist.nickname').exists().notEmpty(),
    check('artist.nationality').exists().notEmpty(),

    // Comprobando que existen las siguientes propiedades (y de que no estén vacías) de un objeto anidado
    check('duration').exists().notEmpty(),
    check('duration.start').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),

    // Comprobando que la siguiente propiedad exista, que no esté vacía y que sea un ID de Mongo
    check('mediaId').exists().notEmpty().isMongoId(),

    // Implementando el middleware para responder ante una petición
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

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
    validatorCreateItem,
    validatorGetItem
}
