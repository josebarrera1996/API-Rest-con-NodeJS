// HELPER
// En este archivo desarrollaremos 2 métodos para realizar el hashing y la comparación de password

const bcryptjs = require('bcryptjs');

// Método para realizar la encriptación de un texto plano, en este caso, la password
const encrypt = async (textPlain) => {

    // Realizar el hash a un texto plano
    return await bcryptjs.hash(textPlain, 10); 
};

// Método para realizar la comparación entre las passwords
const compare = async (passwordPlain, hashPassword) => {

    // Comparación entre la password cruda (en texto plano) y la password encriptada (o hasheada)
    return await bcryptjs.compare(passwordPlain, hashPassword);
};

// Exportando estos métodos
module.exports = {
    encrypt, compare
};