const axios = require("axios");
const cheerio = require("cheerio");

const getSite = async (url, info, par) => {
  await axios.get(url).then(async res => {
    const html = res.data;
    const $ = cheerio.load(html);
    if (par == "titulos") {
      $(".feed-post-link", html).each(function() {
        info.push($(this).text());
      });
    } else if (par == "resumos") {
      $(".feed-post-body-resumo", html).each(function() {
        info.push($(this).text());
      });
    } else if (par == "links") {
      $(".feed-post-link", html).each(function() {
        info.push($(this).attr("href"));
      });
    } else if (par == "datas") {
      info = $("time", html).attr("datetime");
    }
  });

  return info;
};

const recebeTexto = async (url, info, parametro) => {
  info = await getSite(url, info, parametro);
  return info;
};

const getData = async (links, datas) => {
  let info;
  for (i = 0; i < 5; i++) {
    datas[i] = await getSite(links[i], info, "datas");
  }
  return datas;
};

const montaNoticia = async (titulos, resumos, links, datas, noticias) => {
  for (i = 0; i < 5; i++) {
    noticias.push({
      titulo: titulos[i],
      noticia: resumos[i],
      data: datas[i],
      link: links[i]
    });
  }
  return noticias;
};

const checaNoticia = async noticias => {
  const url = "http://localhost:3000/noticias";
  let antigas = [];

  antigas = await axios.get(url).then(res => {
    return res.data;
  });

  for (i = 0; i < 5; i++) {
    console.log("novas:", noticias[i].titulo);
    console.log("antigas:", antigas[i].titulo);
    for (j = 0; j < 5; j++) {
      if (noticias[i].titulo === antigas[j].titulo) {
        noticias.splice(i, 1);
      }
    }
  }

  return noticias;
};

const g1 = async (url, titulos, resumos, datas, links) => {
  let noticias = [];

  titulos = await recebeTexto(url, titulos, "titulos");
  resumos = await recebeTexto(url, resumos, "resumos");
  links = await recebeTexto(url, links, "links");
  datas = await getData(links, datas);
  noticias = await montaNoticia(titulos, resumos, links, datas, noticias);
  noticias = await checaNoticia(noticias);

  return noticias;
};

exports.g1 = g1;
