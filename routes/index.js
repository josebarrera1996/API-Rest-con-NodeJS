const fs = require('fs');
const express = require('express');
const router = express.Router(); // Para manejar las rutas

/* En este archivo desarrollaremos la lógica necesaria para poder realizar un enrutado dinámico */


// Definiendo la ubicación de las rutas
const PATH_ROUTES = __dirname; // __dirname nos brinda la dirección absoluta de donde se encuentra este archivo

// console.log(PATH_ROUTES);


// Método para remover la extensión '.js' 
const removeExtension = (fileName) => {

    // fileName -> index.js, tracks.js, storages.js
    return fileName.split('.').shift(); // index, track, sotrages
}


// Método para leer los archivos que se encuentran en el directorio indicado
// Esto devolverá un arreglo del cual se filtrarán los archivos con sus respectivas extensiones
fs.readdirSync(PATH_ROUTES).filter((file) => {

    // console.log(file); // index.js, tracks.js, etc

    // Obteniendo el los nombres
    const name = removeExtension(file); // index, tracks, storages

    // Trabajar con todos los archivos a excepción de 'index'
    if (name !== 'index') {

        console.log(`Ruta cargada: ${name}`);

        // Cargar las rutas (con su respectivo controller)
        // name -> nombre del archivo (sin la extensión)
        // file -> nombre del archivo (con la extensión). Esto es fundamental para que se activen todo lo relacionado con las rutas
        router.use(`/${name}`, require(`./${file}`)); // http://localhost:3000/api/tracks || users || storages
    }
});



// Exportar este módulo

module.exports = router;


