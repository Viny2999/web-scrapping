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

const updateDataModTelefones = async (req, res) => {
  const telefone = req.params.telefone;

  const dateMod = new Date();

  const dataToUpdate = {
    ultimaVezConsultado: dateMod
  }
  
  const result = await territorioRepository.updateOne(telefone, dataToUpdate);
  res.send(result);
};

module.exports = {
  getMain,
  getTelefones,
  updateDataModTelefones
}