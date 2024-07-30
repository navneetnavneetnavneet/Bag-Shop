const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");
const { sendToken } = require("../utils/SendToken");

module.exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  res.status(200).json(user);
});

module.exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  sendToken(user, 201, res);
});

module.exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User not found with this email address !", 404)
    );
  }

  const isMatch = user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Wrong Credentials !", 500));
  }

  sendToken(user, 200, res);
});

module.exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User Logout Successfully !" });
});
