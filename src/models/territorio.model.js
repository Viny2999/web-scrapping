const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const territorioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true
    },
    endereco: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    cep: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true
    },
    ultimaVezConsultado: {
      type: Date,
      required: true
    }
  },
  {
    collection: 'Territorios',
    versionKey: false
  }
);

const Territorios = mongoose.model('Territorios', territorioSchema);

module.exports = Territorios;