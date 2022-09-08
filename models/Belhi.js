const mongoose = require("mongoose");

const BelhiSchema = mongoose.Schema({
  name: String,
  text: String,
  creater: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  count: Number,
});

const Belhi = mongoose.model("Belhi", BelhiSchema);
module.exports = Belhi;
