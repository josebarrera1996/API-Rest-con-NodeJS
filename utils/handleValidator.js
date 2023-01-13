// HELPER
// En este archivo desarrollaremos la lógica para poder manejar las validaciones

const { validationResult } = require("express-validator");

// Desarrollando el middleware
const validateResults = (req, res, next) => {

    try {

        // Si existe algún error en las validaciones, lanzarlo
        validationResult(req).throw();

        // Si no hay ningún error en las validaciones, continuar con el siguiente middleware o controller
        return next();

    } catch (err) {

        // En caso de error...
        res.status(403);

        res.send({ errors: err.array() });
    }
};

// Exportando el middleware
module.exports = validateResults;

