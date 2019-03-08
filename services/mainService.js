const criaNoticia = require("../utils/criaNoticia");
const uri = require("../config/uri");
const mongo = require("mongodb").MongoClient;

const url = "http://g1.globo.com/rio-de-janeiro/ultimas-noticias.html";
let titulos = [];
let resumos = [];
let data = [];
let links = [];

const dataStart = new Date();

mongo.connect(uri.mlab, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db("scrapping-db");
});

const getMain = (req, res) => {
  res.send({
    apiName: `Scrapping API`,
    startDate: dataStart
  });
};

const getNoticias = (req, res, par) => {
  if (par == "api") {
     db.collection("Noticias")
    .find()
    .toArray((err, results) => {
      res.send(results);
    });
   } else {
     db.collection("Noticias")
    .find()
    .toArray((err, results) => {
      return results;
    });
    }
};

const getNovas = async (req, res) => {
  let ultimasNoticias = await criaNoticia.g1(
    url,
    titulos,
    resumos,
    data,
    links
  );

  ultimasNoticias.forEach(noticia => {
    db.collection("Noticias").insertOne(noticia, (err, result) => {});
  });

  res.send("Ultimas 5 notícias salvas");
};

exports.getMain = getMain;
exports.getNoticias = getNoticias;
exports.getNovas = getNovas;
