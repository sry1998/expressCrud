const express = require('express');
const userModel = require('./user');
const app = express();

app.use(express.json()); 

app.post('/create', async function(req, res, next) {
  const createUser = new userModel(req.body);
  console.log(createUser);
  try {
    const ans = await createUser.save();
    console.log(ans);
    res.send(ans);
  } catch (err) {
    // next(err);
    console.log("err", err)
    throw err;
    //res.status(500).send(err);
  }
});

app.get('/get/:id', async function (req, res) {
  const users = await userModel.find({ id: req.params.id});
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app