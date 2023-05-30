const twilio = require('twilio');
require('dotenv').config()
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.APIKEY, domain: process.env.DOMAIN });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SID);

const client = twilio(process.env.accountSid, process.env.authToken);
const clientPhone = process.env.phone

async function sendMobileNotification(mobileNumber, message) {
    client.messages
    .create({
      body: message,
      from: clientPhone,
      to: mobileNumber,
    })
    .then((message) => console.log('Message sent:', message.sid))
    .catch((error) => console.error('Error sending message:', error));
}

async function sendEmailNotification(emailAddress, message) {
    try {
        const data = {
            from: 'postmaster@isrealogbusolutions.tech',
            to: emailAddress,
            subject: "Stackivy",
            text: message
        };
    
        // Send the email
        const response = await mg.messages().send(data);
        console.log('Email sent:', response);
        } catch (error) {
        console.error('Error sending email:', error);
        }
}

module.exports = {
    sendEmailNotification,
    sendMobileNotification,
}