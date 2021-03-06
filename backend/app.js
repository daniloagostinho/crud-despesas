const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const  morganBody  = require("morgan-body");
const moment = require("moment");

const bodyParser = require("body-parser");
const multer = require("multer");

const port = process.env.PORT || 3000;
// middleware função que será executada antes de qualquer requisição.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

var fs = require("fs");
const path = require("path");
var FormData = require("form-data");

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});



const log = fs.createWriteStream(
  path.join(__dirname, "./logs", `express${moment().format('YYYY-MM-DD')}.log`), { flags: "a" }
);

morganBody(app, {
  noColors: true,
  stream: log,
});
// Models
const User = require("./models/User");
const Revenues = require("./models/Revenues");
const Debts = require("./models/Debts");
app.post("/upload", upload.single("file"), (req, res) => {
  const files = req.files;
  res.json({ message: files });
});

app.get("/download", (req, res) => {
  fs.readdir("./uploads", function (error, files) {
    const form = new FormData();
    const nu_array = files.map((item) => {
      form.append("file", item, item.name);

      return {
        name: item.match(/[^:]*\s/g)[0],
        documento: item.match(/[^:]*$/g)[0],
        data: form,
      };
    });

    res.send(nu_array);
  });
});

app.get("/", function (req, res) {
  res.send({ message: "Bem vindo a nossa API!" });
});

//credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

app.use(express.json());

const connect = () => {
  // servidor
  //   mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.w65a0yv.mongodb.net/test?retryWrites=true&w=majority`, {
  //   server: {
  //     socketOptions: {
  //       socketTimeoutMS: 0,
  //       connectTimeoutMS: 10000
  //     }
  //   }
  // });

  //local
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.w65a0yv.mongodb.net/test?retryWrites=true&w=majority`
  );
  const connection = mongoose.connection;

  connection.on("error", () => {
    console.error("Erro ao se conectar ao mongo");
  });
  connection.on("open", () => {
    console.error("Conectamos ao mongo");
  });
};

connect();

// retorna dados do usuario
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // checa se usuario existe
  const user = await User.findById(id, "-password");

  // se usuario nao for encontrado
  if (!user) {
    return res.status(404).json({ message: "Usuario nao encontado!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado! Verifique se o token foi passado!" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido!" });
  }
}

// registro user
app.post("/auth/register/user", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // validations
  if (!name) {
    return res.status(422).json({ message: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatório!" });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ message: "As senhas não são iguais!" });
  }

  // chega se usuario existe
  // primeira query no banco feita!!
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res
      .status(422)
      .json({ message: "Já existe uma conta com esse e-mail!" });
  }

  //cria senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // cria o usuario
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ message: "Usuario criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.. tente mais tarde!" });
  }
});

// cadastro

app.post("/auth/debts", async (req, res) => {
  const title = req.body.user.mouth.title;
  const user = req.body.user.title;

  const { despesa, categoria, valor, dataVencimento } =
    req.body.user.mouth.listMouth;

  // cria o usuario
  const debts = new Debts({
    user: {
      title: user,
      mouth: {
        title,
        listMouth: {
          despesa,
          categoria,
          valor,
          dataVencimento,
        },
      },
    },
  });

  try {
    await debts.save();
    res.status(201).json({ message: "cadastro realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.. tente mais tarde!" });
  }
});

app.get("/list/debts", async (req, res) => {
  Debts.find({}).then((list) => {


    const { mouth } = req.headers;
    const { user } = req.headers;

     const novoArr = list.map(el => {
      return {
        user: {
          title: el.user.title,
          mouth: {
            title: el.user.mouth.title,
            listMouth: {
              _id: el._id.toString(),
              despesa: el.user.mouth.listMouth.despesa,
              valor: el.user.mouth.listMouth.valor,
              categoria: el.user.mouth.listMouth.categoria,
              dataVencimento: el.user.mouth.listMouth.dataVencimento,
              acoes: ['https://raw.githubusercontent.com/daniloagostinho/crud-despesas/master/src/assets/images/edit.png', 'https://raw.githubusercontent.com/daniloagostinho/crud-despesas/master/src/assets/images/delete.png']
            }
          }
        }
      }

     })


    console.log('novoarr -->> ', novoArr)


    const result = mouth
      ? novoArr.filter(
          (item) =>
            user.includes(item.user.title) &&
            item.user.mouth.title.includes(mouth)
        )
      : list;

    res.status(200).json({ result });
  });
});

// testar depois no angular!!
app.put("/update/debts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Debts.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/update/revenues/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Revenues.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({user});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/delete/debts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Debts.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatório!" });
  }

  let user = null;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    res.send("err --> ", err);
  }

  if (!user) {
    return res.status(404).json({ message: "Usuario não encontrado!" });
  }

  // checa se senha da math

  const checkpassword = await bcrypt.compare(password, user.password);

  if (!checkpassword) {
    return res.status(422).json({ message: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({
      message: "Autenticação realizada com sucesso!",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Aconteceu um erro no servidor, tente mais tarde!",
    });
  }
});

app.post("/auth/revenues", async (req, res) => {
  const { tipoReceita, valor, dataEntrada } = req.body.user.mouth.listMouth;
  const title = req.body.user.mouth.title;
  const user = req.body.user.title;

  // validations
  if (!tipoReceita) {
    return res.status(422).json({ message: "O tipoReceita é obrigatório!" });
  }
  if (!valor) {
    return res.status(422).json({ message: "O valor é obrigatório!" });
  }
  if (!dataEntrada) {
    return res.status(422).json({ message: "A dataEntrada é obrigatório!" });
  }

  // cria o usuario
  const revenues = new Revenues({
    user: {
      title: user,
      mouth: {
        title,
        listMouth: {
          tipoReceita,
          valor,
          dataEntrada
        }
      }
    }
  });

  console.log('revenues ->>> ', revenues)

  try {
    await revenues.save();
    res.status(201).json({ message: "cadastro realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.. tente mais tarde!" });
  }
});

app.get("/list/revenues", async (req, res) => {
  // TODO
  Revenues.find({}).then((list) => {
    const { mouth } = req.headers;
    const showMonth = mouth ? mouth : "";
    const {user} = req.headers;



    const novoArr = list.map(el => {
      return {
        user: {
          title: el.user.title,
          mouth: {
            title: el.user.mouth.title,
            listMouth: {
              _id: el._id.toString(),
              tipoReceita: el.user.mouth.listMouth.tipoReceita,
              valor: el.user.mouth.listMouth.valor,
              dataEntrada: el.user.mouth.listMouth.dataEntrada,
              acoes: ['https://raw.githubusercontent.com/daniloagostinho/crud-despesas/master/src/assets/images/edit.png', 'https://raw.githubusercontent.com/daniloagostinho/crud-despesas/master/src/assets/images/delete.png']
            }
          }
        }
      }
    })
    const result = showMonth ? novoArr.filter((item) => user.includes(item.user.title) && item.user.mouth.title.includes(mouth)) : list;
    res.status(200).json({result});
  });
});

// listagem de todos os usuarios

app.get("/list/user", checkToken, async (req, res) => {
  User.find({}, "-password").then((user) => {
    res.status(200).json({ user });
  });
});

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});
