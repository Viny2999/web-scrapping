const TerritorioSchema = require('../models/territorio.model');
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
  return TerritorioSchema;
};

const territorio = connect();

const count = async () => {
  return await territorio.countDocuments();
};

const findAll = async () => {
  const response = await territorio.find().sort({ _id: 1 });
  return response;
};

const findOneByName = async name => {
  return await territorio.findOne({ name: name });
};

const findOneByCidade = async cidade => {
  return await territorio.findOne({ cidade: cidade });
};

const findOneByEstado = async estado => {
  return await territorio.findOne({ estado: estado });
};

const insert = async newTerritorio => {
  return await territorio.create(newTerritorio);
};

const updateOne = async (name, dataToUpdate) => {
  return await territorio.findOneAndUpdate({ name: name }, dataToUpdate);
};

const deleteOne = async name => {
  return await territorio.deleteOne({ name: name });
};

module.exports = {
  count,
  findAll,
  findOneByName,
  findOneByCidade,
  findOneByEstado,
  insert,
  updateOne,
  deleteOne
};
