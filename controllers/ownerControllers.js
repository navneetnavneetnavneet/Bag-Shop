const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Owner = require("../models/ownerModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/productModel");
const imagekit = require("../utils/ImageKit").initImagekit();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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

module.exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.files) {
    const owner = await Owner.findById(req.params.id);
    if(!owner){
      return next(new ErrorHandler("Owner is not found !", 404))
    }

    const product = await new Product(req.body).save();
    const file = req.files.image;
    const modifiledfilename = uuidv4() + path.extname(file.name);

    // upload file on imagekit
    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiledfilename,
    });
    product.image = { fileId, url };
    await product.save();
    owner.products.push(product._id);
    await owner.save();

    res.status(201).json(product);
  } else {
    return next(new ErrorHandler("Product Image is required !", 500));
  }
});
