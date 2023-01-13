// Middleware personalizado
// Será utilizado para que sea implementado en las rutas y verificar si el usuario está autenticado (o logeado)

const { verifyToken } = require('../utils/handleToken');
const { handleHttpError } = require('../utils/handleError');
const { usersModel } = require('../models');

// Método para chequear si el usuario está autenticado
const checkAuth = async (req, res, next) => {

    try {

        // Si no existe el token en los encabezados...
        if (!req.headers.authorization) {

            // Invocar manejador de errores
            handleHttpError(res, "NOT_ALLOW", 409);
            return;
        }

        // Si existe, capturar el token
        const token = req.headers.authorization.split(" ").pop(); // Omitir 'Bearer'

        // Verificar si el token es el que corresponde al usuario logeado (ha sido firmado por el mismo)
        const tokenData = await verifyToken(token);

        // Si existe la propopiedad '_id', es porque hay coincidencia...
        if (tokenData._id) {

            // Encontrar el usuario que está realizando la petición...
            const user = await usersModel.findById(tokenData._id);

            // Inyectar este mismo usuario al 'request'
            req.user = user;

            next(); // Continuar con el curso de ejecución...
        } else {
            handleHttpError(res, "NOT_ALLOW", 409);
        }

    } catch (error) {

        // Invocar manejador de errores
        handleHttpError(res, 'NOT_SESSION', 401);
    }
};

// Exportando este middleware
module.exports = checkAuth;