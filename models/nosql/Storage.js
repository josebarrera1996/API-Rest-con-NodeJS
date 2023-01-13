const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete'); // Para poder implementar el soft-delete

// Definiendo el Schema para la colección 'storages'
const StorageSchema = new mongoose.Schema(

    {
        // Campos de la colección
        url: {
            type: String
        },

        filename: {
            type: String
        }
    },

    {
        // Campos adicionales: createdAt & updatedAt
        timestamps: true,

        // Versionado
        versionKey: false
    }
);

// Añadiendo plugins
// Aplicando el soft delete a este schema al añadir dos nuevos campos 'deleted' y 'deletedAt'
// Sobreescribirá los métodos que nos viene con Mongoose para que sean adaptables con este tipo de eliminación
StorageSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt:true });

// Exportando el modelo
module.exports = mongoose.model("storage", StorageSchema); // La colección tendrá el nombre de 'storages'