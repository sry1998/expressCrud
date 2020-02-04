const express = require('express');
const authController = require('../controller/authController');
const app = express.Router();

app.post('/register', authController.register);

app.get('/user', authController.getUser);

app.post('/login', authController.login);

module.exports = app;     