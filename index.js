const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/userRoutes');
const auth = require('./routes/authRoutes');

const app = express();
const mongoDB = 'mongodb://127.0.0.1/my_database';
const hostname = '127.0.0.1';
const port = 3001;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(auth);
app.use(router);
app.use(express.json());
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})