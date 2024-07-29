const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required !"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      trim: true,
      unique: true,
      // match: []
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
      trim: true,
      maxLength: [15, "Password should not exceed more than 15 characters !"],
      minLength: [6, "Password should have atleat 6 characters !"],
    },
    picture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    prducts: [],
    gstin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("owner", ownerSchema);
