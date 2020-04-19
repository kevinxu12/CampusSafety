var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
    title: String, 
    email: String, 
    description: String, 
    location: String,
    firstname: String,
    lastname: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('request', requestSchema);