/* Archivo principal de la aplicación */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // Para manejar las variables de entorno
const dbConnect = require('./config/mongo');


// Instanciando a Express

const app = express();


// Inicializando a 'dotenv'

dotenv.config();


// Middlewares

app.use(cors()); // Para el manejo de los 'cors' (accesibilidad)

app.use(express.json()); // Para poder manejar datos en formato JSON

app.use(express.static("storage")); // Para poder sacar los recursos estáticos de la carpeta 'storage' y de esta manera poder sacar su URL

const port = process.env.PORT || 3000;


// Implementando las rutas de manera dinámica

app.use("/api", require("./routes")); // http://localhost:3000/api + familia de rutas


// Levantando el servidor

app.listen(port, () => {
    console.log('Tu app está lista por http://localhost:' + port);
});


// Implementando la conexión

dbConnect();

