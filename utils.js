const axios = require("axios");
const cheerio = require("cheerio");

const getSite = async (url, par, info) => {
  await axios.get(url).then(async res => {
    const $ = cheerio.load(res.data);
    if (par == "titulo") {
      $(".feed-post-link", res.data).each(function() {
        info.push($(this).text());
      });
    } else {
      $(".feed-post-body-resumo", res.data).each(function() {
        info.push($(this).text());
      });
    }
  });

  return info;
};

const recebeTitulo = async (url, titulos) => {
  return new Promise((resolve, reject) => {
    titulos = getSite(url, "titulo", titulos);
    console.log(titulos);
    resolve(titulos);
  });
};

const recebeResumo = async (url, resumos) => {
  return new Promise((resolve, reject) => {
    resumos = getSite(url, "resumos", resumos);
    resolve(resumos);
  });
};

const montaNoticia = async (titulos, resumos, noticias) => {
  return new Promise((resolve, reject) => {
    for (i = 0; i < 9; i++) {
      noticias.push({ titulo: titulos[i], noticia: resumos[i] });
      console.log(titulos[i]);
    }
    console.log(noticias);
    resolve(noticias);
  });
};

const g1 = (url, titulos, resumos) => {
  let noticias = [];
  return new Promise((resolve, reject) => {
    recebeTitulo(url, titulos);
    recebeResumo(url, resumos);
    montaNoticia(titulos, resumos, noticias);

    resolve(noticias);
  });
};

exports.g1 = g1;
