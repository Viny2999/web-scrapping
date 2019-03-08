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

const montaNoticia = async (titulos, resumos, noticias) => {
	await for (i = 0; i < 9; i++) {
    noticias.push({titulo: titulos[i], noticia: resumos[i]});
  }
 return noticias;
}

const g1 = async (url, titulos, resumos) => {
  let noticias = [];
  
  await recebeTitulo(url, titulos);
  await recebeResumo(url, resumos);
  await montaNoticia(titulos, resumos, noticias);
  
  return noticias;
};

exports.g1 = g1;
