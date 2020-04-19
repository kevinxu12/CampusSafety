var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// the Alert model represents an accepted request: aka a publishable crime report
var alertSchema = new Schema({
    title: String, 
    description: String, 
    location: String,
    email: String,
    firstname: String,
    lastname: String,
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('alert', alertSchema);