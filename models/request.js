var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
    title: String, 
    description: String, 
    location: String,
    firstname: String,
    lastname: String
})

module.exports = mongoose.model('request', requestSchema);