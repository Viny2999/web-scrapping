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

const findOneByName = async name => {
  return await usuario.findOne({ name: name });
};

const findByCongregation = async congregation => {
  return await usuario.find({ congregation: congregation });
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
  findOneByName,
  findByCongregation,
  insert,
  updateOne,
  deleteOne
};
