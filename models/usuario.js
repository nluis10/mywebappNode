const mongoose = require('../db/database')

const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    tipoUsuario: String,
    contrasena: String
})

const Usuario = mongoose.model('usuarios', UsuarioSchema)

module.exports = Usuario