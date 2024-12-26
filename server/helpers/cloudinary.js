const cloudinary = require("cloudinary").v2;
const multer = require("multer");

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  }, (error, result) => {
    if (error) {
      console.error("Error uploading image:", error);
    } else {
      console.log("Uploaded image details:", result);
    }
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
