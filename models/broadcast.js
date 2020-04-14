var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var broadcastSchema = new Schema({
    title: String, 
    description: String, 
    author: String,
    time: String
})

module.exports = mongoose.model('broadcast', broadcastSchema);