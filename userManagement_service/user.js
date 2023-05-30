const userdb =  require('../model/db');

async function fetchUserInformation(userId) {
  return new Promise((res, rej)=> {
  userdb().then((users)=>{
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new Error('user does not exist.')
    }
    res(user)
  }).catch ((err)=> {
    rej(err)
  })
  })
}

async function profile(req, res){
  const database = userdb()
  .then((users)=>{
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
      throw new Error('user does not exist.')
    }
    const data = {
      username: user.first_name,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email
    }
    res.json({ data: data })
  }).catch ((err)=> {
    throw new Error('err')
  })
}

async function dashboard(req, res){
  const database = userdb()
  .then((users)=>{
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
      throw new Error('user does not exist.')
    }
    delete user['password']
    return res.json({ data: user })
  }).catch ((err)=> {
    throw new Error('err')
  })
}

module.exports = {
  fetchUserInformation, 
  profile, 
  dashboard
}

