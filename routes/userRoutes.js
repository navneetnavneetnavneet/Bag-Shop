const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", (req, res, next) => {
  res.json("it's working");
});

router.post("/current", isAuthenticated, currentUser);

// POST /users/register
router.post("/register", registerUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/logout
router.get("/logout", isAuthenticated, logoutUser);

module.exports = router;
