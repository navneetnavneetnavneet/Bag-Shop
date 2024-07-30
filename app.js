require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const app = express();
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// db connection
require("./models/db").connectDatabase();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session and cookie
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

// logger
app.use(logger("tiny"));

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/owners", require("./routes/ownerRoutes"));
app.use("/products", require("./routes/productRoutes"));

// error handling
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedErrors);

// creating server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
