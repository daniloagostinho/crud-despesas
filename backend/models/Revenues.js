const mongoose = require("mongoose")

const Revenues = mongoose.model('Revenues', {
  month: {
    name: {
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
