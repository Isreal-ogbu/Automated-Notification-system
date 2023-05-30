const userdb = require("../model/db")

async function checkWalletBalance(userId) {
    // Implement the logic to check wallet balance using User Wallet microservice
    // Return the wallet balance
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

async function wallet(req, res){
  const database = userdb()
  .then((users)=>{
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
      throw new Error('user does not exist.')
    }
    return res.json({ data: user.wallet })
  }).catch ((err)=> {
    throw new Error('err')
  })
}

module.exports = {
  checkWalletBalance,
  wallet
}