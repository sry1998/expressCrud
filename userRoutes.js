const express = require('express');
const userModel = require('./user');
const app = express.Router();

app.use(express.json());

app.post('/users', async function (req, res, next) {
  const createUser = new userModel(req.body);
  try {
    const ans = await createUser.save();
    res.send(ans);
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/users', async function (req, res, next) {
  try {
    const allUsers = await userModel.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async function (req, res) {
  try {
    const users = await userModel.find({ id: req.params.id });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async function (req, res) {
  const msg = "User updated successfully";
  try {
    await userModel.updateOne({ id: req.params.id }, { $set: { name: req.body.name } })
    await userModel.save()
  } catch (err) {
    res.status(500).send(err)
  }
  res.send(msg)
})

app.delete('/users/:id', async function (req, res) {
  try {
    const deleteUser = await userModel.deleteOne({ id: +req.params.id });
    const msg = "User removed successfully"
    if (!deleteUser) res.status(404).send("No item found");
    res.status(200).send(msg);
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app