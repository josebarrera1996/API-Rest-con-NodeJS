/* En este archivo se desarrollará la lógica que será implementada cuando accedamos a las rutas del 'auth' */

const { usersModel } = require('../models/index'); // Importando el modelo para implementar los métodos de Mongoose
const { matchedData } = require('express-validator');
const { tokenSign } = require('../utils/handleToken');
const { encrypt, compare } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');

/* Definiendo los métodos */

// Método para registrar un nuevo usuario
const registerCtrl = async (req, res) => {

    try {

        // Aplicar 'matchedData' para limpiar el request
        const body = matchedData(req);

        // Encriptar la password
        const password = await encrypt(body.password);

        // Preparando el objeto a insertar
        const bodyInsert = { ...body, password }; // Lo colocado en los campos + el hashing de la password

        // Proceder a insertar en la B.D el nuevo usuario y alojarlo en esta variable
        const dataUser = await usersModel.create(bodyInsert);

        // Lógica para que el campo 'password' no se muestre al crearlo
        // Es necesario esto, ya que el filtro que se le aplica en el modelo no funcionará
        dataUser.set('password', undefined, { strict: false });

        // Preparando el objeto que representará la respuesta a enviar
        const data = {
            token: await tokenSign(dataUser), // Generando el token
            user: dataUser
        }

        // Enviar la siguiente respuesta
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_REGISTER_USER');
    }
};

// Método para poder logearse como usuario
const loginCtrl = async (req, res) => {

    try {

        // Aplicar 'matchedData' para limpiar el request
        const body = matchedData(req);

        // Traer los datos del usuario gracias al email
        // Todo esto con la finalidad de saber si el usuario existe en la B.D
        // Traer el campo 'password' (el cual fue deshabilitado en el modelo) y otros más
        const user = await usersModel.findOne({ email: body.email }).select('password name role email');

        // Si el usuario no existe...
        if (!user) {

            // Invocando el manejador de error
            handleHttpError(res, 'USER_NOT_EXISTS', 404);
            return;
        }

        // Comparar las passwords (la cruda y la encriptada de la B.D)
        const checkPassword = await compare(body.password, user.get('password'));

        // Si no coinciden...
        if (!checkPassword) {

            // Invocando el manejador de error
            handleHttpError(res, 'PASSWORD_INVALID', 401);
            return;
        }

        /* Si todo ha salido bien... */

        // No mostrar el campo 'password'
        user.set('password', undefined, { strict: false });

        // Generar el token de sesión
        const tokenJwt = await tokenSign(user);

        // Preparando el objeto que representará la respuesta a enviar
        const data = {
            token: tokenJwt,
            user: user,
        };

        // Enviar la respuesta
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_LOGIN_USER');
    }
};

// Exportando los méotdos
module.exports = {
    registerCtrl,
    loginCtrl
};