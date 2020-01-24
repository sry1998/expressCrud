const express = require('express');
const mongoose = require('mongoose');

const router = require('./userRoutes.js');

const app = express();
const mongoDB = 'mongodb://127.0.0.1/my_database';
const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(router);
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})