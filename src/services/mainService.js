const territorioRepository = require("../repositories/territorio.repository");

const getMain = async (req, res) => {
  res.send({
    apiName: `Territorio - Scrapping API`
  });
};

const getTelefones = async (req, res) => {
  const endereco = req.params.endereco;
  const result = await territorioRepository.getTelefoneByEndereco(endereco);
  res.send(result);
};

const getObservacao = async (req, res) => {
  const telefone = req.params.telefone;

  const result = await territorioRepository.findOneByTelefone(telefone);
  res.send(result);
}

const deleteObservacao = async (req, res) => {
  const telefone = req.params.telefone;
  const id = req.query.id;

  const result = await territorioRepository.deleteObservacao(telefone, id);
  res.send(result);
}

const updateDataModTelefones = async (req, res) => {
  const telefone = req.params.telefone;
  const observacoesArray = req.body.observacoes;

  const dateMod = new Date();

  const dataToUpdate = {
    ultimaVezConsultado: dateMod,
    observacoes: observacoesArray
  }
  
  const result = await territorioRepository.updateOne(telefone, dataToUpdate);
  res.send(result);
};

module.exports = {
  getMain,
  getTelefones,
  getObservacao,
  deleteObservacao,
  updateDataModTelefones
}