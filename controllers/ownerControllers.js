const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Owner = require("../models/ownerModel");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports.createOwner = catchAsyncErrors(async (req, res, next) => {
  const owners = await Owner.find();

  if (owners.length > 0) {
    return next(
      new ErrorHandler(
        "You don't have permissinon to create a new owner !",
        404
      )
    );
  }

  const createdOwner = await new Owner(req.body).save();
  res.status(201).json(createdOwner);
});
