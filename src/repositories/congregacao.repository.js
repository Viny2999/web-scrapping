const CongregacaoSchema = require('../models/congregacao.model');
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
  return CongregacaoSchema;
};

const congregacao = connect();

const findAll = async () => {
  return await congregacao.find({});
};

module.exports = {
  findAll
};
