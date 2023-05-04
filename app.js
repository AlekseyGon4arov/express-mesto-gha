const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '6453ed620fcc4a2959274b1e' };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).send({ message: 'Такого роута нет' });
});

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});