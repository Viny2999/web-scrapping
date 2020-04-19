const congregacaoRepository = require("../repositories/congregacao.repository");

const getAll = async (req, res) => {
  const result = await congregacaoRepository.findAll();
  res.send(result);
};


const getCongregacaoByName = async (req, res) => {
  const cod = req.params.congregacao;

  const result = await congregacaoRepository.findOne(cod);
  res.send(result);
};

module.exports = {
  getAll,
  getCongregacaoByName
}