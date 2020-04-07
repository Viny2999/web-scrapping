const axiosDefault = require('axios');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const mongoose = require('mongoose');
const axios = axiosDefault.default;
const url = 'https://www.telenumeros.com/?dir=pesquisa&pesquisa=cidade:Rio%20AND%20cidade:de%20AND%20cidade:Janeiro%20AND%20estado:RJ%20&da=';

const territorioSchema = new mongoose.Schema(
  {
    nome: String,
    endereco: String,
    telefone: String,
    cep: String,
    cidade: String,
    estado: String
  },
  {
    collection: 'Territorios',
    versionKey: false
  }
);

const territorio = mongoose.model('Territorios', territorioSchema);

const connect = () => {
  mongoose.connect(
    'mongodb://admin:territ0ri0srdp@ds051615.mlab.com:51615/scrapping-db',
    {
			useNewUrlParser: true,
			useUnifiedTopology: true,
      useFindAndModify: false
    }
  );
  return territorio;
};

const Territorios = connect();

const start = async () => {
	try {
		let inicioFor = 0;
		for(inicioFor ; inicioFor < 401529 ; inicioFor += 10) {
			const html = await (await axios.get(url + inicioFor)).data;
			const $ = cheerio.load(html);
			cheerioTableparser($);

			const data = $("table").parsetable(true, true, true);
			const table = data[0];

			let inicio = 40;

			for(let i = 0 ; i < 10 ; i++) {
				let pessoa = {};
		
				for(let j = 0 ; j < 6 ; j++) {
					switch (j) {
						case 0:
							pessoa.nome = table[inicio];
							break;
						
						case 1:
							pessoa.telefone = table[inicio].replace(/Telefone /, '');
							break;
		
						case 2:
							pessoa.endereco = table[inicio];
							break;
		
						case 3:
							pessoa.cidade = table[inicio].replace(/Cidade /, '');
							break;
		
						case 4:
							pessoa.estado = table[inicio].replace(/Estado |[()]/g, '');
							break;
		
						case 5:
							pessoa.cep = table[inicio].replace(/CEP /, '');
							break;
					}
		
					inicio++;
				}
				
				try {
					await Territorios.create(pessoa);
					console.log(pessoa);
					console.log('Atualmente em: ' + inicioFor);
				} catch (err) {
					console.error(err);
				}

				inicio+= 2;
		
				if(i == 3) {
					inicio+= 2;
				}
			}
		}
	} catch (error) {
		console.error('Parou em: ' + inicioFor);
	}

	process.exit();
};

start();
