const express = require("express");
const router = express.Router();

// GET /
router.get("/", (req, res, next) => {
  res.json("it's working");
});

// POST /create
router.post("/create", (req, res, next) => {
  res.json("it's working");
});

module.exports = router;
