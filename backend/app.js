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
var FormData = require('form-data');

const app = express();
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Models
const User = require("./models/User")

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

// retorna dados do usuario
app.get("/user/:id", checkToken, async(req, res) => {
  const id = req.params.id;

  // checa se usuario existe
  const user = await User.findById(id, '-password')

  // se usuario nao for encontrado
  if(!user) {
    return res.status(404).json({message: 'Usuario nao encontado!'})
  }

  res.status(200).json({user})
})

function checkToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if(!token) {
    return res.status(401).json({message: 'Acesso negado! Verifique se o token foi passado!'});
  }

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next();
  } catch(err) {
    res.status(400).json({message: "Token inválido!"})
  }
}

// registro
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

// login
app.post("/api/auth/login", async(req, res) => {
  const {email, password} = req.body;

  if(!email) {
    return res.status(422).json({message: 'O email é obrigatório!'})
  }
  if(!password) {
    return res.status(422).json({message: 'A senha é obrigatório!'})
  }

  const user = await User.findOne({email: email})

  if(!user) {
    return res.status(404).json({message: 'Usuario não encontrado!'})
  }

  // checa se senha da math

  const checkpassword = await bcrypt.compare(password, user.password)

  if(!checkpassword) {
    return res.status(422).json({message: 'Senha inválida!'})
  }

  try {

    const secret = process.env.SECRET;
    const token =  jwt.sign({
      id: user._id
    },
    secret)

    res.status(200).json({
      message: 'Autenticação realizada com sucesso!', token
    })

  } catch(err) {
      console.log(err)
      res.status(500).json({
        message: 'Aconteceu um erro no servidor, tente mais tarde!'
      })
  }

})

// listagem

app.get("/list/user", checkToken, async(req, res) => {
  User.find({}, '-password').then((user) => {
    res.status(200).json({user})
  })
})

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`)
})
