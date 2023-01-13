/* Configuración de la conexión con MongoDB */

const mongoose = require('mongoose');


// Método para la conexión con la B.D

const dbConnect = () => {

    // URL de la B.D
    const DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI, {

        // Parámetros de conexión
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        (err, res) => {

            if (!err) {
                console.log('**** CONEXIÓN CORRECTA ****');
            } else {
                console.log('**** ERROR DE CONEXIÓN ****');
            }
        }
    )
}


// Exportando este módulo

module.exports = dbConnect;