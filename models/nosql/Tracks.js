const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete'); // Para poder implementar el soft-delete

// Definiendo el Schema para la colección 'tracks'
const TracksSchema = new mongoose.Schema(

    {
        // Campos de la colección
        name: {
            type: String,
        },

        album: {
            type: String,
        },

        cover: {
            
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },

        // Documento anidado
        artist: {

            // Campos
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },

        // Documento anidado
        duration: {

            // Campos
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },

        // Referencia a 'Storage'
        mediaId: {
            type: mongoose.Types.ObjectId,
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
TracksSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt:true });

// Exportando el modelo
module.exports = mongoose.model("track", TracksSchema); // La colección tendrá el nombre de 'tracks'