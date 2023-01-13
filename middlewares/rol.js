// Middleware personalizado
// Será utilizado para que sea implementado en las rutas y verificar si el usuario tiene el rol necesario para realizar determinadas acciones

const { handleHttpError } = require('../utils/handleError');

// Método que recibe doble argumentos
// El parámetro 'roles' será un arreglo con los roles permitidos
const checkRol = (roles) => (req, res, next) => {

    try {

        // Obtener del request la propiedad 'user'
        // Recordar que esta viene del middleware 'auth'
        const { user } = req;

        console.log({ user });

        // Obtener los roles del usuario logeado
        const rolesByUser = user.role; // Arreglo

        // Verificar si el usuario cumple con el rol especificado en el argumento del método
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));

        // Si no tiene el rol necesario...
        if (!checkValueRol) {

            // Invocando el manejador de errores
            handleHttpError(res, 'USER_NOT_PERMISSIONS', 403);
        }

        // Si lo tiene, que siga con la ejecución desarrollada en la ruta...
        next();

    } catch (error) {

        // Invocando el manejador de errores
        handleHttpError(res, 'ERROR_PERMISSIONS', 403);
    }




    
};

// Exportando el middleware
module.exports = checkRol;

