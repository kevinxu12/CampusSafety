var express = require('express');
var app = express();
var session = require('express-session');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
//var uri = "mongodb+srv://vinkebot:7i81X7J02X88LC8k@firstcluster-u93p5.mongodb.net/test?retryWrites=true&w=majority"
var uri = "mongodb+srv://mattkim:minwoo123@cluster0-un1ah.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri);
mongoose.connection.on('connected', function(){
    console.log("connected to mongo db instance");
});

app.use(session({
    resave: true,
    secret: "12345",
    saveUnitialized: true
}));

//define models
var User = require("./models/user");
require('./models/request');

// define routes
var authRoutes = require('./routes/authroutes.js')(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// install routes
app.post('/api/checklogin/', authRoutes.check_login);
app.post('/api/signup/', authRoutes.signup);
app.post('/api/deleteprofile/', authRoutes.delete_profile);

require('./routes/requestRoutes')(app);

app.listen(5000);
console.log('Server running on port. Now open http://localhost:3000/ in your browser!');