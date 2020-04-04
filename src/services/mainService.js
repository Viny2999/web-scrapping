const criaNoticia = require("./criaNoticia");
const CSV = require("./CSVGenerator");
const territorioRepository = require("../repositories/territorio.repository");

const url = "http://g1.globo.com/rio-de-janeiro/ultimas-noticias.html";
let titulos = [];
let resumos = [];
let data = [];
let links = [];

const getMain = async (req, res) => {
  res.send({
    apiName: `Territorio - Scrapping API`
  });
};

const getNoticias = async (req, res) => {
  return await territorioRepository.findAll();
};

const getNovas = async (req, res) => {
  let ultimasNoticias = await criaNoticia.g1(
    url,
    titulos,
    resumos,
    data,
    links
  );
  
  try {
    for(let noticia of ultimasNoticias) {
      await territorioRepository.insert(noticia);
    }
  } catch (error) {
    res.send({ response: "Ocorreu um Erro" });
  }

  res.send({ response: "Ultimas notícias salvas" });
};

const download = async (req, res) => {
  const filepath = __dirname + "/../download/ultimas_noticias.csv";

  const results = await territorioRepository.findAll();
  await CSV.generateCSV(results);
  res.download(filepath);
};

modules.exports = {
  getMain,
  getNoticias,
  getNovas,
  download
}