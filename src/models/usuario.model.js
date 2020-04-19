const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    congregation: {
      type: String,
      required: true
    },
    userLevel: {
      type: String
    },
    ruasAvailable: {
      type: [String]
    },
  },
  {
    collection: 'Usuarios',
    versionKey: false
  }
);

const Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;