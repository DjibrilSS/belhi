const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  login: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;