const mongoose = require("mongoose");

const userDB = process.env.USER_DB
const passwordDB = process.env.PASSWORD_DB
const nameBD = process.env.NAME_DB
const uriDB = `mongodb+srv://${userDB}:${passwordDB}@servermongo.c8zfh.mongodb.net/${nameBD}?retryWrites=true&w=majority`
mongoose
  .connect(uriDB)
  .then(() => {
    console.log(`CONECTADO A LA BASE DE DATOS: ${nameBD}`);
  })
  .catch((e) => {
    console.log("Error Bd: ", e);
  });

module.exports = mongoose;
