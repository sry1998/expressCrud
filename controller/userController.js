const userModel = require('../model/userModel');

exports.getAllUser = async function (req, res) {
  try {
    const allUsers = await userModel.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUserById =  async function (req, res) {
  try {
    const users = await userModel.find({ id: req.params.id });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
 
exports.addUser = async function (req, res) {
  const createUser = new userModel(req.body);
  try {
    const ans = await createUser.save();
    res.send(ans);
  } catch (err) {
    res.status(500).end(err);
  }
}; 

exports.updateUser = async function (req, res) {
  const msg = "User updated successfully";
  try {
    await userModel.updateOne({ id: req.params.id }, { $set: { name: req.body.name } })
    await userModel.save()
  } catch (err) {
    res.status(500).send(err)
  }
  res.send(msg)
};

exports.deleteUser = async function (req, res) {
  try {
    const deleteUser = await userModel.deleteOne({ id: +req.params.id });
    const msg = "User removed successfully"
    if (!deleteUser) res.status(404).send("No item found");
    res.status(200).send(msg);
  } catch (err) {
    res.status(500).send(err)
  }
};