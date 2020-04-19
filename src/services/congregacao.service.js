const congregacaoRepository = require("../repositories/congregacao.repository");

const getAll = async (req, res) => {
  const result = await congregacaoRepository.findAll();
  res.send(result);
};

module.exports = {
  getAll
}