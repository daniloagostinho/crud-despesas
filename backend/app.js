const express = require("express");
const cors = require("cors")
require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const bodyParser = require("body-parser");
const multer = require("multer")

const port  = process.env.PORT || 3000;

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

// Models
const User = require("./models/User")

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

app.get('/', function (req, res) {

  res.send({message: 'Bem vindo a nossa API!'})
})


//credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

app.use(express.json())

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.w65a0yv.mongodb.net/?retryWrites=true&w=majority`).then(() => {
  console.log('Conectado ao banco!!')
}).catch((err) => console.log(err))


app.post('/auth/register', async(req, res) => {
  const {name, email, password, confirmPassword} = req.body;

  // validations
  if(!name) {
    return res.status(422).json({message: 'O nome é obrigatório!'})
  }
  if(!email) {
    return res.status(422).json({message: 'O email é obrigatório!'})
  }
  if(!password) {
    return res.status(422).json({message: 'A senha é obrigatório!'})
  }

  if(password !== confirmPassword) {
    return res.status(422).json({message: 'As senhas não são iguais!'})
  }

  // chega se usuario existe
  // primeira query no banco feita!!
  const userExist = await User.findOne({email: email})

  if(userExist) {
    return res.status(422).json({message: 'Já existe uma conta com esse e-mail!'})
  }

  //cria senha
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // cria o usuario
  const user = new User({
    name,
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({message: 'Usuario criado com sucesso!'})
  } catch(error) {
    res.status(500).json({message: 'Erro no servidor.. tente mais tarde!'})
  }
})

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`)
})
