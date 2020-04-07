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
  const response = await territorio.find().sort({ _id: 1 }).limit(20);
  console.log(response);
  return response;
};

const findOneByName = async name => {
  return await territorio.findOne({ name: name });
};

const findOneEndereco = async endereco => {
  return await territorio.findOne({ endereco: endereco });
};

const findOneByTelefone = async telefone => {
  return await territorio.findOne({ telefone: telefone });
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

const updateOne = async (telefone, dataToUpdate) => {
  return await territorio.findOneAndUpdate({ telefone: telefone }, dataToUpdate);
};

const deleteOne = async name => {
  return await territorio.deleteOne({ name: name });
};

const getTelefoneByEndereco = async endereco => {
  console.log(endereco);
  
  const res = await territorio.aggregate([
    { 
        $match: { 
            endereco: endereco
        } 
    },
    { 
        $project: {
        endereco: '$endereco',
        telefone: '$telefone',
        ultimaVezConsultado: '$ultimaVezConsultado'
      }
    },
    {
      $group: {
       _id: "$endereco",
        count: {$sum: 1},
        entry: {
            $push: {
              telefone: "$telefone",
              ultimaVezConsultado: '$ultimaVezConsultado'
            }
        }
      }
    },
    { 
        $project: {
        _id: 0,
        rua: '$_id',
        total: '$count',
        telefones: '$entry'
      }
    }
  ]);

  console.log(res);
  
  return res;
};

module.exports = {
  count,
  getTelefoneByEndereco,
  findAll,
  findOneByName,
  findOneEndereco,
  findOneByTelefone,
  findOneByCidade,
  findOneByEstado,
  insert,
  updateOne,
  deleteOne
};
