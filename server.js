const express = require("express");

const path = require("path")

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/hands-on'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + 'dist/hands-on/index.html')
})

app.listen(PORT, () => {
  console.log('servidor inicializado na porta' + PORT)
})
