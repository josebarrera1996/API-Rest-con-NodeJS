// HELPER
// En este archivo desarrollaremos un manejador de errores

// Método para manejar los errores de HTTP
const handleHttpError = (res, message = 'Algo sucedió', code = 403) => {

    // Código de respuesta
    res.status(code);
    
    // Mensaje a enviar
    res.send({ error: message });
};

// Exportando este módulo
module.exports = {
    handleHttpError
};