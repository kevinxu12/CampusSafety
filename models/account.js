var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  phone: {type: String},
  university: {type: String}
});

module.exports = mongoose.model("accounts", AccountSchema);