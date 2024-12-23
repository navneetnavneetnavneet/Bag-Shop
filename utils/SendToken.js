module.exports.sendToken = (user, statusCode, res) => {
  const token = user.getjwttoken();

  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secret: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ id: user._id, token });
};
