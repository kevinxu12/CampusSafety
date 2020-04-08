var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  phone: {type: String},
  university: {type: String},
  admin: {type: Boolean}
});

module.exports = mongoose.model("Admin", AdminSchema);