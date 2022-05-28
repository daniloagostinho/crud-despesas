const express = require("express");
const cors = require("cors")

const bodyParser = require("body-parser");
const multipart = require("connect-multiparty")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload  = multer({storage})

var fs = require('fs');
var domain = require('domain').create();
var FormData = require('form-data');

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

app.post('/upload', upload.single("file"), (req, res) => {
  const files = req.files;
  console.log()
  res.json({message: files})
})


app.get('/download', (req, res) => {

  fs.readdir('./uploads',function(error,files){
    const form = new FormData();
    const nu_array = files.map((item) => {
      form.append('file', item, item.name)
      console.log('item.name --> ' + item.name)

      return { name: item.match(/[^:]*\s/g)[0], documento: item.match(/[^:]*$/g)[0], data: form };
    });

    res.send(nu_array);
  });

})


app.use((err) => res.json({error: err}))

app.listen(3000, () => {
  console.log('Servidor na porta 3000')
})
