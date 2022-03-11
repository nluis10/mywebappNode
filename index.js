const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
require('dotenv').config()

const verificarToken = require('./validarToken/validarToken')

const rutasPublicas = require("./routes/rutasPublicas");
const rutas = require("./routes/rutas");

const app = express();
const port = process.env.PORT
const corsOptions = {
  origin: "*",
};

const jsonParser = bodyParser.json()

app.use("/api", cors(corsOptions), jsonParser, rutasPublicas);

app.use("/api", cors(corsOptions), jsonParser, verificarToken, rutas);

app.use("/", cors(corsOptions), (req, res) => {
  res.json({
    mensaje: "API Gestion de cultivos",
  });
});

app.listen(port, () => {
  console.log("SERVIDOR LISTO");
});
