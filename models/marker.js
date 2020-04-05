var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
    latitude: Number,
    longitude: Number,
    title: String, 
    description: String, 
    firstname: String,
    lastname: String
})

module.exports = mongoose.model('marker', markerSchema);