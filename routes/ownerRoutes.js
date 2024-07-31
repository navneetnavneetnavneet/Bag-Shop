const express = require("express");
const { createOwner, createProduct } = require("../controllers/ownerControllers");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("it's working");
});

// POST /owners/create
router.post("/create", createOwner);

// POST /owners/product/create
router.post("/product/create/:id", createProduct);

module.exports = router;
