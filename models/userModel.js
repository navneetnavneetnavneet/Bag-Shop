const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
    contact: {
      type: Number,
    },
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: "product"}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "product"}],
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

userSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", userSchema);
