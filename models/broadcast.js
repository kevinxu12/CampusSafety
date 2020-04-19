var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var broadcastSchema = new Schema({
    title: String, 
    description: String, 
    firstname: String,
    lastname: String,
    longitude: Number,
    latitude: Number,
    time: String
})

module.exports = mongoose.model('broadcast', broadcastSchema);