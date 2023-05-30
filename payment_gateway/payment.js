const transactionNotification = require("../notification_service/transactionNotification")

async function paymentApi(req, res) {
  const { amount, cardNumber, cardExpiration, cvv, notificationtype } = req.body;
  const userid = req.user.id
  processPayment(userid, notificationtype,  amount, cardNumber, cardExpiration, cvv)
    .then(paymentResult => {
      res.json({ result: paymentResult });
    })
    .catch(error => {
      res.status(500).json({result: { success: false, message: 'Payment failed', error: error.message }});
    });
};

function processPayment(userid, notificationtype,  amount, cardNumber, cardExpiration, cvv) {
  // Replace this with your actual payment gateway integration logic
  return new Promise((resolve, reject) => {
    // I Simulate the payment processing with a delay
    setTimeout(async () => {
      // Use the transaction module to determine a payment result
      const success = await transactionNotification(userid, amount, notificationtype); // A demo function to Perform transaction operation
      if (success == 1) {
        resolve({ success: true, message: "Transaction Successful", transactionId: 'T-1234567890' });
      } else if (success == 0) {
        resolve({ success: false, message: "Transaction Unsuccessful", transactionId: "T-asdf12ghj123bn23"});
      } else if (success == -1){
        reject(new Error('Payment failed'));
      }
    }, 2000); // I simulate a 2-second payment processing time for the transaction
  });
}

module.exports = paymentApi