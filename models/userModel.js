const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
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
      select: false,
      maxLength: [15, "Password should not exceed more than 15 characters !"],
      minLength: [6, "Password should have atleat 6 characters !"],
    },
    picture: {
      type: String,
    },
    contact: {
      type: Number,
    },
    cart: [],
    prducts: [],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
