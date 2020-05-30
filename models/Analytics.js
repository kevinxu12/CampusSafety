var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var analyticsSchema = new Schema({
    name: String,
    requestMade: Number,
    requestRejected: Number,
    requestAccepted: Number,
})

module.exports = mongoose.model('analytics', analyticsSchema);