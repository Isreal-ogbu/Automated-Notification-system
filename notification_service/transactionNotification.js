const {fetchUserInformation, profile, dashboard } = require("../userManagement_service/user")
const wallet = require('../userManagement_service/wallet')
const { sendEmailNotification, sendMobileNotification } = require("./emailMobileNotificaton")

async function transactionNotification(userid, deposit, notificatinType) {

  try {
      const userId = userid;
      const amount = parseInt(deposit);
      const notificationType = notificatinType;
  
      // Fetch user information
      const userInfo = await fetchUserInformation(userId).then((res)=> { return {data: res}});

      // Check wallet balance
      const walletbalance = await wallet.checkWalletBalance(userId).then((res)=> { return {data: res}});
      const walletBalance = parseInt(walletbalance.data.wallet.Balance)

      // Check if wallet balance is insufficient
      if (walletBalance < amount) {
        // Prepare notification message
        const message = `Dear ${userInfo.data.username}, your automated deposit of ${amount} failed due to insufficient funds. Please visit https://stackivy.africa/ to resolve issue. Thank you for using our service`;
  
        // Send notification based on the notification type specified
        if (notificationType === 'mobile') {
          await sendMobileNotification(userInfo.data.phone, message);
          return 0
        } else if (notificationType === 'email') {
          await sendEmailNotification(userInfo.data.email, message);
          return 0
        } else {
          throw new Error('Invalid notification type specified.');
        }
      } else {
        const message = `Dear ${userInfo.data.username}, your automated deposit of ${amount} was sussessful. Thank you for using our service`;

        if (notificationType === 'mobile') {
          await sendMobileNotification(userInfo.data.phone, message);
          return 1
        } else if (notificationType === 'email') {
          await sendEmailNotification(userInfo.data.email, message);
          return 1
        } else {
          throw new Error('Invalid notification type specified. check notification type');
        }
      }
    } catch (error) {
      console.error('Error occurred during the notification process:', error);
      return -1
    }
}


module.exports = transactionNotification