const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");
const router = express.Router();

// GET /
router.get("/", (req, res, next) => {
  res.json("it's working");
});

// POST /users/register
router.post("/register", registerUser);

// POST /users/login
router.post("/login", loginUser);

module.exports = router;
