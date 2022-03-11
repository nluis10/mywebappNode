const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const Modelo = require("../models/modelo");


const rutas = express.Router();

let perfilDB = [
  {

  },
];


rutas.get("/usuarios", async (req, res) => {
  let usuarios = await Usuario.find();
  res.json(usuarios);
});

rutas.get("/usuario/:id", async (req, res) => {
  let usuarioId = await Usuario.findById(req.params.id);
  res.json(usuarioId);
});

rutas.post("/verificarContrasena/:id", async (req, res) => {
  let usuarioId = await Usuario.findById(req.params.id);

  let validarPassword = await bcrypt.compare(req.body.contrasenaActual, usuarioId.contrasena);

  if (!validarPassword) {
    return res.json({
      mensaje: "CONTRASEÑA ACTUAL INVALIDA",
    });
  }else {
    return res.json({
      mensaje: "CORRECTA",
    });
  }
});

rutas.put("/actualizarContrasena/:id", async (req, res) => {

  let salt = await bcrypt.genSalt(12);
  let password = await bcrypt.hash(req.body.contrasenaNueva, salt);

  const usuario = await Usuario.updateMany(
    { _id: req.params.id } ,
    { $set: { contrasena: password} }
 )
  res.json(usuario);
});

rutas.put("/editarUsuario/:id", async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.email = req.body.email;
  usuario.telefono = req.body.telefono;
  usuario.tipoUsuario = req.body.tipoUsuario;

  await usuario.save();

  res.json({ mensaje: "Usuario actualizado" });
});

rutas.get("/usuarioEmail/:email", async (req, res) => {
  let usuarioId = await Usuario.findOne({ email: req.params.email });
  res.json(usuarioId);
});

rutas.post("/buscarUsuario", async (req, res) => {
  let buscar = req.body.buscar;
  let usuarios = await Usuario.find({
    $or: [{ nombre: { $regex: buscar } }, { apellido: { $regex: buscar } }, { email: { $regex: buscar } }, { tipoUsuario: { $regex: buscar } }, { telefono: { $regex: buscar } }],
  });
  res.json(usuarios);
});

rutas.post("/agregarUsuario", async (req, res) => {
  let datos = req.body;

  let salt = await bcrypt.genSalt(12);
  let password = await bcrypt.hash(datos.contrasena, salt);

  datos = {
    ...datos,
    contrasena: password,
  };

  let usuario = await new Usuario(datos);
  await usuario.save();
  res.json({ mensaje: "Usuario agregado" });
});

rutas.put("/editarUsuario/:id", async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.email = req.body.email;
  usuario.telefono = req.body.telefono;
  usuario.tipoUsuario = req.body.tipoUsuario;

  await usuario.save();

  res.json({ mensaje: "Usuario actualizado" });
});

rutas.delete("/eliminarUsuario/:id", async (req, res) => {
  let usuario = await Usuario.findById(req.params.id);

  await usuario.deleteOne();

  res.json({ mensaje: "Usuario eliminado" });
});



rutas.get("/modelos", async (req, res) => {
  let modelos = await Modelo.find();
  res.json(modelos);
});



rutas.get("/perfil", (req, res) => {
  res.json(perfilDB);
});

module.exports = rutas;
