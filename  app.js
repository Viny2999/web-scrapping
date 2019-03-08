const axios = require("axios");
const cheerio = require("cheerio");
const utils = require("./utils");
const url = "http://g1.globo.com/rio-de-janeiro/ultimas-noticias.html";
let titulos = [];
let resumos = [];

let a = utils.g1(url, titulos, resumos);

console.log(a);
