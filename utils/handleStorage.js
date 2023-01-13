// HELPER
// En este archivo desarrollaremos la lógica para poder subir archivos al disco duro

const multer = require('multer');

// Configurando a 'multer'

// Variable en la que definiremos el lugar de destino de los archivos subidos y como se los nombrará
// Esto simboliza a un 'middleware'
const storage = multer.diskStorage({

    // Lugar de destino de los archivos subidos
    destination: function (req, file, cb) {

        // Ruta de destino
        const pathStorage = `${__dirname}/../storage`;

        // Invocando la función callback para indicar el error (si lo hay) y el destino
        cb(null, pathStorage);
    },

    // Una función que determinará el nombre del archivo subido
    // La estrategia que se utilizará será la de renombrar de manera aleatoria los archivos (para evitar que se sobreescriban)
    filename: function (req, file, cb) {

        // Obtener la extensión de los archivos (el contenido que hay en el último punto del archivo)
        const extension = file.originalname.split(".").pop(); // Archivo 'foto.png' -> ["foto", "png"] -> png

        // Definiendo el nombre del archivo
        const filename = `file-${Date.now()}.${extension}`; // Número representado por milisegundos + extensión

        // Invocando la función callback para indicar el error (si lo hay) y el nombre del archivo
        cb(null, filename);
    }
});


// Aplicando el 'middleware' para que luego pueda ser inyectado en las rutas
const uploadMiddleware = multer({ storage });


// Exportando el módulo (middleware)
module.exports = uploadMiddleware;