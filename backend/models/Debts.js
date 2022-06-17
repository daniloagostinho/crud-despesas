const mongoose = require("mongoose")

const Debts = mongoose.model('Debts', {
  user: {
    title: String,
    mouth: {
      title: String,
      listMouth: {
        despesa: String,
        categoria: String,
        valor: String,
        dataVencimento: String
      }
    }
  }
});

module.exports = Debts;
