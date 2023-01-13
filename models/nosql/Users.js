const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete'); // Para poder implementar el soft-delete

// Definiendo el Schema para la colección 'users'
const UserSchema = new mongoose.Schema(

    {
        // Campos de la colección
        name: {
            type: String
        },

        age: {
            type: Number
        },

        email: {
            type: String,
            unique: true
        },

        password: {
            type: String,
            select: false // Para que este campo no se nos devuelva (no se muestre)
        },

        role: {
            type: ["user", "admin"],
            default: "user"
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
UserSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt:true });

// Exportando el modelo
module.exports = mongoose.model("user", UserSchema); // La colección tendrá el nombre de 'users'