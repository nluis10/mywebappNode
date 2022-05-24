const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const { getFileStream } = require('../s3')

const rutas = express.Router();

//Verificar datos para autenticar al usuario
rutas.post("/login", async (req, res) => {
    let usuario = req.body.email;
  
    let usuarioDB = await Usuario.findOne({ email: usuario });
  
    if (!usuarioDB) {
      return res.json({
         mensaje: "EL USUARIO NO EXISTE" 
        });
    } else {
      let validarPassword = await bcrypt.compare(req.body.contrasena, usuarioDB.contrasena);
  
      if (!validarPassword) {
        return res.json({
          mensaje: "CONTRASEÑA INVALIDA",
        });
      }
    }
  
    token = jwt.sign({
      id: usuarioDB._id,
      usuario: usuarioDB.email
    }, process.env.SECRET_JWT)
  
    return res.json({
      mensaje: "BIENVENIDO",
      id: usuarioDB._id,
      usuario: usuarioDB.email,
      nombre: usuarioDB.nombre,
      apellido: usuarioDB.apellido,
      telefono: usuarioDB.telefono,
      tipoUsuario: usuarioDB.tipoUsuario,
      token: token
    })
  });

  //Obtener imagen de S3
  rutas.get('/s3Image/:key', (req, res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)
  
    readStream.pipe(res)
  })

  module.exports = rutas;