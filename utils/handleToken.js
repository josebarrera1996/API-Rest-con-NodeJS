// HELPER
// En este archivo desarrollaremos la lógica para poder firmar, verificar y decodificar el token

const jwt = require('jsonwebtoken');

// Método para 'firmar' al token
const tokenSign = async (user) => { // Recibirá como argumento el objeto del 'user'

    // Firmar el token
    return jwt.sign(
        {
            // Payload
            // Firmaremos con las siguientes propiedades
            _id: user._id,
            role: user.role
        },
        // Clave secreta
        process.env.JWT_SECRET,

        // Configuraciones opcionales
        {
            // Tiempo de expiración del Token
            expiresIn: '2h'
        }
    );
};

// Método para 'verificar' al token
// Se comprueba que el token se haya firmado de manera correcta por el usuario
const verifyToken = async (token) => { // Recibirá como argumento el 'token' de la sesión
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
};

// Método para 'decodificar' al token
const decodeSign = (token) => {
    return jwt.decode(token, null);
};

// Exportando estos métodos
module.exports = {
    tokenSign,
    verifyToken,
    decodeSign
};
