const express = require("express");
const bcrypt = require("bcrypt");
const Modelo = require("../models/modelo");

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile } = require('../s3')

const rutas = express.Router();

//Agregar modelos
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

//Verficar que no este repetida la cedula
rutas.get("/verificarCedula/:cedula", async (req, res) => {
  let modeloId = await Modelo.findOne({ cedula: req.params.cedula });
  res.json(modeloId);
});

//Verficar que no este repetido el correo
rutas.get("/verificarEmail/:email", async (req, res) => {
  let modeloId = await Modelo.findOne({ email: req.params.email });
  res.json(modeloId);
});

//Obtener todos los modelos
rutas.get("/modelos", async (req, res) => {
  let modelos = await Modelo.find();
  res.json(modelos);
});

//Obtener los datos del modelo por cedula
rutas.get("/perfil/:cedula", async (req, res) => {
  let modeloId = await Modelo.findOne({ cedula: req.params.cedula });
  res.json(modeloId);
});


//Subir imagen al servidor y luego a S3
rutas.post("/images", upload.single('image'), async (req, res) => {
  const file = req.file
  const descripcion = req.body.descripcion
  const cedula = req.body.cedula

  console.log(file)

  //Lamando a la funcion del archivo S3 para subir el archivo
  const result = await uploadFile(file)
  console.log(result)

  //Para borrar el archivo del servidor
  await unlinkFile(file.path)

  imagePath = `s3Image/${result.Key}`

  //Agregar datos de la imagen a la base de datos
  const modelo = await Modelo.findOne({ cedula: cedula });
  imagen = {descripcion: descripcion, ruta: imagePath};
  modelo.imagenes.push(imagen)
  await modelo.save();


  res.json(imagePath);
});

module.exports = rutas;
