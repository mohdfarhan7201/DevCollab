const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    skills: [
      {
        type: String,
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// 👇 Sabse last me model export karte hain
module.exports = mongoose.model("User", userSchema);