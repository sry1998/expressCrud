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
    res.status(500).send(err);
  }
});

app.get('/getall', async function (req, res, next) {
  const allUsers = await userModel.find({});

  try {
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err);
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

app.put('/update/:id', async function(req, res) {
  try {
    const msg = "User updated successfully";
    await userModel.findByIdAndUpdate(req.params.id, req.body)
    await userModel.save()
    res.send(msg)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/delete/:id', async function(req, res) {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    const msg = "User removed successfully"
    if (!deleteUser) res.status(404).send("No item found");
    res.status(200).send(msg);
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app