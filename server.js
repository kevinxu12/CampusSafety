var express = require('express');
var app = express();
var session = require('express-session');1
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
//var uri = "mongodb+srv://mattkim:minwoo123@cluster0-un1ah.mongodb.net/test?retryWrites=true&w=majority"
//var uri = "mongodb+srv://mariatu:Maria2000@cluster0-oa2j0.mongodb.net/test?retryWrites=true&w=majority"
//var uri = "mongodb+srv://mariatu:Maria2000@cluster0-oa2j0.mongodb.net/test?retryWrites=true&w=majority"
var uri = "mongodb+srv://mattkim:minwoo123@cluster0-un1ah.mongodb.net/test?retryWrites=true&w=majority"
//var uri = "mongodb+srv://jlee1115:Yuyeon1115!@cluster0-t3avm.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri);
mongoose.connection.on('connected', function(){
    console.log("connected to mongo db instance");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    resave: true,
    secret: "12345",
    saveUnitialized: true
}));


// PLEASE READ -
// Make of note between Marker and Request schemas - when users submit requests, these should be in the
// request database, and when admins approve these requests, the corresponding request should be deleted
// from the request database and added to the marker database

//define models
var Admin = require("./models/admin");
var Account = require("./models/account");
var Marker = require('./models/marker');
var Request = require('./models/request');
var Broadcast = require('./models/broadcast');
var Alert = require('./models/Alert');
require('./models/Notification');

// define routes
var authRoutes = require('./routes/authroutes.js')(Admin);
var accRoutes = require('./routes/accountRoutes.js');
var markerRoutes = require('./routes/markerRoutes.js')(Request, Marker, Alert, Admin);
var broadcastRoutes = require('./routes/broadcastRoutes')(Broadcast);
require('./routes/requestRoutes')(app);
require('./routes/notificationRoutes')(app);
require('./routes/alertRoutes')(app);



// install routes
app.post('/api/checklogin/', authRoutes.check_login);
app.post('/api/signup/', authRoutes.signup);
app.post('/api/deleteprofile/', authRoutes.delete_profile);
app.post('/api/appsignup/', accRoutes.sign_up);
app.post('/api/applogin/', accRoutes.log_in);
app.get('/api/appprofile/', accRoutes.get_user);
app.post('/api/appdeleteprofile/', accRoutes.delete_user);
app.post('/api/applogout/', accRoutes.log_out);
app.post('/api/postusermarker/', markerRoutes.post_user_marker);
app.get('/api/getallmarkers/', markerRoutes.get_all_markers);
app.post('/api/postadminmarker/', markerRoutes.post_admin_marker);
app.post('/api/makebroadcast/', broadcastRoutes.make_broadcast);
app.get('/api/getAllBroadcasts', broadcastRoutes.getAllBroadcasts);


app.listen(5000);
console.log('Server running on port. Now open http://localhost:3000/ in your browser!');