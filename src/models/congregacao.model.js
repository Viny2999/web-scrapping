const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const congregacaoSchema = new Schema(
  {
    cod: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    ruas: {
      type: String
    },
  },
  {
    collection: 'Congregacoes',
    versionKey: false
  }
);

const Congregacoes = mongoose.model('Congregacoes', congregacaoSchema);

module.exports = Congregacoes;