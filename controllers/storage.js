/* En este archivo se desarrollará la lógica que será implementada cuando accedamos a las rutas del 'storage' */

const fs = require("fs");
const { storageModel } = require('../models/index'); // Importando el modelo para implementar los métodos de Mongoose
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

// Obteniendo la variable de entorno que hace referencia a la url pública
const PUBLIC_URL = process.env.PUBLIC_URL;

// Obteniendo la ruta absoluta de donde se encuentran almacenado los archivos subidos
const MEDIA_PATH = `${__dirname}/../storage`;

/* Definiendo los métodos */

// Método para traer los registros (storage)
const getItems = async (req, res) => {

    try {

        // Implementando el método para traer todos los registros de la colección
        const data = await storageModel.find({});

        // Enviar la respuesta (mostrando los registros)
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }

};

// Método para traer un registro en particular (un storage)
const getItem = async (req, res) => {

    try {

        // Aplicar un filtro para limpiar el request
        req = matchedData(req);

        // Obtener el ID del request
        const id = req.id;

        // Implementando el método para traer los datos del item gracias a su ID
        const data = await storageModel.findById(id);

        // Enviar la respuesta mostrando los datos obtenidos
        res.send({ data });

    } catch (e) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

// Método para crear un nuevo registro (un storage)
const createItem = async (req, res) => {

    try {

        // Obteniendo lo enviado en 'file' del request
        const { file } = req;

        // Mostrar por consola lo que estamos enviando en el 'file'
        console.log(file);

        // Obteniendo lo que ha sido enviado en el archivo a 'file'
        // Para completar los campos en el documento
        const fileData = {

            // Propiedades
            filename: file.filename, // nombre del archivo,
            url: `${PUBLIC_URL}/${file.filename}` // url del archivo
        }

        // Implementando el método para crear un nuevo documento
        const data = await storageModel.create(fileData);

        // Enviar la respuesta con los datos generados
        res.send({ data });

    } catch (error) {

        // Invocando el manejador de error
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }
};


// Método para eliminar un registro (un storage) utilizando el soft delete
// También se eliminará, de forma física, el archivo que ha sido alojado
const deleteItem = async (req, res) => {

    try {

        // Aplicar un filtro para limpiar el request
        req = matchedData(req);

        // Obtener el ID del request
        const id = req.id;

        // Implementando el método para traer los datos del item gracias a su ID
        const findMedia = await storageModel.findById(id);

        // Obteniendo el nombre del archivo
        const fileName = findMedia.filename;

        // Proceder a eliminar el registro de una manera lógica
        await storageModel.delete({ _id: id });

        // Proceder a eliminar el archivo de la carpeta 'storage'
        fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);

        // Preparando el objeto a mandar como respuesta
        const data = {
            findMedia: fileName,
            deleted: true,
        };

        // Enviar la siguiente respuesta con lo obtenido
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
    deleteItem
};




