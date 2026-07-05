const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    // ======================================================
    // BASIC INFO
    // ======================================================

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

    username: {
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
      select: false,
    },

    // ======================================================
    // PROFILE
    // ======================================================

    avatar: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    // ======================================================
    // SOCIAL (FOLLOW SYSTEM)
    // ======================================================

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ======================================================
    // SYSTEM FLAGS
    // ======================================================

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// PASSWORD HASHING
// ======================================================

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// ======================================================
// PASSWORD CHECK
// ======================================================

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ======================================================
// ACCESS TOKEN
// ======================================================

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// ======================================================
// REFRESH TOKEN
// ======================================================

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

module.exports = mongoose.model("User", userSchema);