const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("./logout")
const userdb =  require('../model/db');
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

function login(req, res) {
  const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    const database = userdb()
    .then ((users)=> {
      const user = users.find((user) => user.username === username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (!result) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      var data = { id: user.id, username: user.username }
      const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ data: data, token: token });
    });
  })
  .catch((err)=>{
    return res.status(404).json({ message: 'User not found' });
  })
}
module.exports = login