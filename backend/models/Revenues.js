const mongoose = require("mongoose")

const Revenues = mongoose.model('Revenues', {
  user: {
    title: String,
    mouth: {
      title: String,
      listMouth: {
        tipoReceita: String,
        valor: String,
        dataEntrada: String
      }
    }
  }
});

module.exports = Revenues;
