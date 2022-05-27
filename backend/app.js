const express = require("express");
const cors = require("cors")

const bodyParser = require("body-parser");
const multipart = require("connect-multiparty")

const multipartModdleware  = multipart({uploadDir: './uploads'})

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
  credentials: true,
}));

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.post('/upload', multipartModdleware, (req, res) => {
  const files = req.files;
  console.log()
  res.json({message: files})
})

app.use((err) => res.json({error: err}))

app.listen(3000, () => {
  console.log('Servidor na porta 3000')
})
