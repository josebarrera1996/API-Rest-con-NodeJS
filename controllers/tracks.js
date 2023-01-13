/* En este archivo se desarrollará la lógica que será implementada cuando accedamos a las rutas de los 'tracks' */

const { tracksModel } = require('../models/index'); // Importando el modelo para implementar los métodos de Mongoose
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

/* Definiendo los métodos */

// Método para traer los registros (tracks)
const getItems = async (req, res) => {

    try {

        // Verificar que 'user' está realizando esta petición
        // Todo esto gracias a el middleware 'auth'
        // console.log(req.user);

        // Implementando el método para traer todos los registros de la colección
        const data = await tracksModel.find({});

        // Enviar la respuesta (mostrando los registros)
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
};

// Método para traer un registro en particular (un track)
const getItem = async (req, res) => {

    try {

        // Aplicar un filtro para limpiar el request
        req = matchedData(req);

        // Obtener el ID del request
        const { id } = req;

        // Implementando el método para traer los datos del item gracias a su ID
        const data = await tracksModel.findById(id);

        // Enviar la respuesta mostrando los datos obtenidos
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

// Método para crear un nuevo registro (un track)
const createItem = async (req, res) => {

    try {

        // Obteniendo lo desarrollado en el 'body' del request
        // Aplicando 'matchedData' para evitar que un tercero ingrese nuevos campos que no son manejados por el modelo
        const body = matchedData(req);

        // Mostrar por consola lo que estamos enviando en el 'body'
        console.log(body);

        // Implementando el método para crear un nuevo documento
        const data = await tracksModel.create(body);

        // Enviar la respuesta con los datos generados
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
};

// Método para actualizar un registro existente (un track)
const updateItem = async (req, res) => {

    try {

        // Obteniendo lo desarrollado en el 'body' del request
        // Aplicando 'matchedData' para evitar que un tercero ingrese nuevos campos que no son manejados por el modelo
        const { id, ...body } = matchedData(req); // Extraemos el 'id' y lo desarrollado en el body. Es decir, 2 objetos separados

        // Implementando el método para obtener los datos de un registro en específico y la posibilidad de actualizarlos
        const data = await tracksModel.findOneAndUpdate(id, body);

        // Enviar la respuesta con los datos generados
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};

// Método para eliminar un registro (un track) de una manera soft (el registro seguirá existiendo)
const deleteItem = async (req, res) => {

    try {

        // Aplicar un filtro para limpiar el request
        req = matchedData(req);

        // Obtener el ID del request
        const { id } = req;

        // Implementando el método (que viene de 'mongoose-delete') para eliminar el item gracias a su ID. 
        // Recordar que será una eliminación de tipo lógica
        const findData = await tracksModel.delete({ _id: id });

        // Data obtenida 
        const data = {
            findData: findData,
            deleted: true,
        };

        // Enviar la respuesta con los datos generados
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }

};


// Exportando los métodos
module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};