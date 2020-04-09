var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
    latitude: Number,
    longitude: Number,
    title: String, 
    description: String, 
    location: String,
    firstname: String,
    lastname: String
})

module.exports = mongoose.model('marker', markerSchema);