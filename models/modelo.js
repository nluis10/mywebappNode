const mongoose = require('../db/database')

const Schema = mongoose.Schema

const ModeloSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    tipoUsuario: String,
    contrasena: String
})

const Modelo = mongoose.model('modelos', ModeloSchema)

module.exports = Modelo

