const transactionNotifications = require("./transactionNotification")
async function notificationApi(req, res){
    const { userid, amount, notificationtype} = req.params
    if (req.user.id == userid){
      new Promise((resolve, reject) => {
        // Simulate the payment processing with a delay
        setTimeout(async () => {
          // Use the transaction module to determine a payment result
          const success = await transactionNotifications(parseInt(userid), amount, notificationtype)
          if (success == 1) {
            resolve({ success: true, message: "Transaction Successful", transactionId: 'T-1234567890' });
          } else if (success == 0) {
            resolve({ success: false, message: "Transaction Unsuccessful", transactionId: "T-asdf12ghj123bn23"});
          } else if (success == -1){
            reject(new Error('Payment failed'));
          }
        }, 2000); // I simulate a 2-second payment processing time for the transaction
      }).then(paymentResult => {
        res.json({ result: paymentResult });
      })
      .catch(error => {
        res.status(500).json({result: { success: false, message: 'Payment failed', error: error.message }});
      });
    }
    else {
      res.status(401).json({result: { success: false, message: 'Payment failed', error: "Unauthorized Transaction"}});
    }
}

module.exports = notificationApi