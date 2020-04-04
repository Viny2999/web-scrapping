const fs = require("fs");
const path = require("path");
const os = require("os");

const generateCSV = noticias => {
  const filename = path.join(__dirname, `../download/ultimas_noticias.csv`);
  const output = [];

  output.push("titulo;noticia;data;link");
  noticias.forEach(noticia => {
    output.push(
      `${noticia.titulo};${noticia.noticia};${noticia.data};${noticia.link}`
    );
  });
  fs.writeFileSync(filename, output.join(os.EOL));
};

exports.generateCSV = generateCSV;
