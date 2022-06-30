const express = require("express")

const router = express.Router();


router.get("/user/:id", checkToken, async (req, res) => {
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
router.post("/auth/register/user", async (req, res) => {
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

router.post("/auth/debts", async (req, res) => {
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

router.get("/list/debts", async (req, res) => {
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
router.put("/update/debts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Debts.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/delete/debts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Debts.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// login
router.post("/auth/login", async (req, res) => {
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

router.post("/auth/revenues", async (req, res) => {
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

router.get("/list/revenues", async (req, res) => {
  // TODO
  Revenues.find({}).then((list) => {
    const { mouth } = req.headers;
    const showMonth = mouth ? mouth : "";
    const {user} = req.headers;
    const result = showMonth ? list.filter((item) => user.includes(item.user.title) && item.user.mouth.title.includes(mouth)) : list;
    res.status(200).json({result});
  });
});

// listagem de todos os usuarios

router.get("/list/user", checkToken, async (req, res) => {
  User.find({}, "-password").then((user) => {
    res.status(200).json({ user });
  });
});

router.get("/download", (req, res) => {
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

module.exports = router
