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
  titulos = await getSite(url, "titulo", titulos);
  // console.log(titulos);
};

const recebeResumo = async (url, resumos) => {
  resumos = await getSite(url, "resumos", resumos);
  // console.log(resumos);
};

const g1 = async (url, titulos, resumos) => {
  await recebeTitulo(url, titulos);
  await recebeResumo(url, resumos);
  for (i = 0; i < 9; i++) {
    console.log(titulos[i]);
    console.log(resumos[i]);
    console.log("\n");
  }
};

exports.getSite = getSite;
exports.recebeTitulo = recebeTitulo;
exports.recebeResumo = recebeResumo;
exports.g1 = g1;
