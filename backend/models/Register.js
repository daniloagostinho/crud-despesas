const mongoose = require("mongoose")

const Register = mongoose.model('Register', {
  tipoReceita: String,
  valor: String,
  dataEntrada: String
});

module.exports = Register;
