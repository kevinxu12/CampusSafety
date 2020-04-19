var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    firstname: String,
    lastname: String, 
    email: String,
    description: String
})

module.exports = mongoose.model('notification', notificationSchema);