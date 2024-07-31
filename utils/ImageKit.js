const ImageKit = require("imagekit");

module.exports.initImagekit = () => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMGAEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  return imagekit;
};
