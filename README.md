# PRAZO Webscrapping

## API REST desenvolvida com o Framework Express e Cheerio

A API consome as últimas notícias do site do G1 por meio de scrapping e salva em um ambiente Mongo.
A lib Cheerio implementa jQuery em server side para manipulação de html mais facilmente.

### Instruções

Rode `npm i` e `npm start` para usar a API em `http://localhost:3000`.

### Endpoints

#### Método `GET` em `http://localhost:3000/noticias`

Retorna um JSON com todas as notícias catalogadas.

#### Método `GET` em `http://localhost:3000/scrap`

Faz Scrapping das últimas notícias do site.

#### Método `GET` em `http://localhost:3000/download`

Baixa um CSV com todas as notícias salvas.
