var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var uri = "mongodb+srv://mattkim:minwoo123@cluster0-un1ah.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri);

var User = require("./models/users");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('./public/'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(8080)
console.log('Server running on port. Now open http://localhost:8080/ in your browser!');