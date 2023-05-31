var express = require("express");
var login = require("./Authentication/login");
var auth = require("./Authentication/logout")
var authenticateToken = require('./middlewares/authorization')
var payment = require("./payment_gateway/payment")
var user = require("./userManagement_service/user");
var transactionNotifications = require("./notification_service/notify")
var wallet = require("./userManagement_service/wallet");
var errorhandler = require("errorhandler");

var http = require("http");
var morgan = require("morgan");

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error Handler
if ('development' == app.get("env")) {
  app.use(errorhandler());
}


// Routes
app.post('/login', login); // login user
app.post('/logout', authenticateToken, auth.logout); // logout current user
app.post('/payment', authenticateToken, payment); // Payment gateway : Required in body (Amount-string, notificationtype (email or mobile)-string)
app.post("/:userid/:amount/:notificationtype", authenticateToken, transactionNotifications) // To test Notofication process through an Api system
app.get('/profile', authenticateToken, user.profile); //Fetch user profile
app.get('/dashboard', authenticateToken, user.dashboard); //Fetch user information for dashboard
app.get('/wallet', authenticateToken, wallet.wallet); //Fetch user wallet balance


// run the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('app running on: 127.0.0.1:' + app.get('port'));
});
