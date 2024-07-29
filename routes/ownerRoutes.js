const express = require("express");
const { createOwner } = require("../controllers/ownerControllers");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("it's working");
});

// POST /owners/create
router.post("/create", createOwner);

module.exports = router;
