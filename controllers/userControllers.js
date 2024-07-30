const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");

module.exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  res.status(201).json(user);
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

  if(!isMatch){
    return next(new ErrorHandler("Wrong Credentials !", 500))
  }

  res.status(200).json(user);
});
