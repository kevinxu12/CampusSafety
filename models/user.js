var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  phone: {type: String},
  college: {type: String},
  admin: {type: Boolean}
});
UserSchema.plugin(random);

module.exports = mongoose.model("User", UserSchema);