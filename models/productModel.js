const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    discount: {
      type: String,
      default: 0,
    },
    bgColor: {
      type: String,
      required: [true, "BG Color is required"],
    },
    panelColor: {
      type: String,
      required: [true, "Panel Color is required"],
    },
    textColor: {
      type: String,
      required: [true, "Text Color is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
