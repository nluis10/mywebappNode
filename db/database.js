const mongoose = require("mongoose");

const userDB = process.env.USER_DB
const passwordDB = process.env.PASSWORD_DB
const nameBD = process.env.NAME_DB
//const uriDB = `mongodb+srv://${userDB}:${passwordDB}@servermongo.c8zfh.mongodb.net/${nameBD}?retryWrites=true&w=majority`
const uriDB = `mongodb://${userDB}:${passwordDB}@servermongo-shard-00-00.c8zfh.mongodb.net:27017,servermongo-shard-00-01.c8zfh.mongodb.net:27017,servermongo-shard-00-02.c8zfh.mongodb.net:27017/${nameBD}?ssl=true&replicaSet=atlas-1255rm-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose
  .connect(uriDB)
  .then(() => {
    console.log(`CONECTADO A LA BASE DE DATOS: ${nameBD}`);
  })
  .catch((e) => {
    console.log("Error Bd: ", e);
  });

module.exports = mongoose;
