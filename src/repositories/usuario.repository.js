const UsuarioSchema = require('../models/usuario.model');
const mongoose = require('mongoose');
require('dotenv').config();

const uri =
  process.env.NODE_ENV === 'dev'
    ? process.env.MONGO_URI_LOCAL
    : process.env.MONGO_URI;

const connect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return UsuarioSchema;
};

const usuario = connect();

const findOneByUsername = async username => {
  return await usuario.findOne({ username: username });
};

const insert = async newUsuario => {
  return await usuario.create(newUsuario);
};

const updateOne = async (username, dataToUpdate) => {
  return await usuario.findOneAndUpdate({ username: username }, dataToUpdate);
};

const deleteOne = async (username) => {
  return await usuario.deleteOne({username: username});
};

module.exports = {
  findOneByUsername,
  insert,
  updateOne,
  deleteOne
};
