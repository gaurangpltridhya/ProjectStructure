const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    contact: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
