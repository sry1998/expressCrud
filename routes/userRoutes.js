const express = require('express');
const userController = require('../controller/userController');
const roou = express.Router();

app.post('/users', userController.addUser);

app.get('/users', userController.getAllUser);

app.get('/users/:id', userController.getUserById);

app.put('/users/:id', userController.updateUser);

app.delete('/users/:id', userController.deleteUser);

module.exports = app