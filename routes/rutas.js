const express = require("express");
const bcrypt = require("bcrypt");
const Modelo = require("../models/modelo");


const rutas = express.Router();


rutas.post("/agregarModelo", async (req, res) => {
  let datos = req.body;
  let maxId = await Modelo.findOne().sort({modeloId:-1}).limit(1);
  let id
  if (!maxId){
    id = 1
  }else{
    id = parseInt(maxId.modeloId) + 1;
  }
  datos = {
    ...datos,
    modeloId: id,
  };
  let modelo = await new Modelo(datos);
  await modelo.save();
  res.json({ mensaje: "Modelo agregado", MaxId: id});
});


rutas.get("/modelos", async (req, res) => {
  let modelos = await Modelo.find();
  res.json(modelos);
});


module.exports = rutas;
