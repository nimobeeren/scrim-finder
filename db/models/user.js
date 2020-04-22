const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    steamId: String,
    lastLogin: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
