const mongoose = require('../db/database')

const Schema = mongoose.Schema

const ModeloSchema = new Schema({
    modeloId: Number,
    nombre: String,
    apellido: String,
    cedula: String,
    alias: String,
    sexo: String,
    fechaNacimiento: String,
    ciudad: String,
    status: String,
    email: String,
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
    pornhub: String,
})

const Modelo = mongoose.model('modelos', ModeloSchema)

module.exports = Modelo

