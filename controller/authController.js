const jwt = require('jsonwebtoken');
const User = require('../model/authmodel');
const config = require('../config');

exports.register =  async function(req, res) {
  const createUser = new User(req.body); 
  await createUser.save(function (err, User) {
  res.status(200).send({ auth: true, token: token });
  }); 
}

exports.login = async function(req, res) {
    User.findOne({ email: req.body.email }, function (err, User) {
    if (err) return res.status(500).send('Error on the server.');
    if (!User) return res.status(404).send('No user found.');
    if (req.body.password !== User.password)
      return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ name: User.name }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
};

exports.getUser = function(req, res) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    await User.find({name: decoded.name}, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
  })
}