const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/**
 * Upload a buffer directly to Cloudinary via stream.
 * Works on all deployment platforms (no temp disk needed).
 */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer to readable stream and pipe into Cloudinary
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null); // signal end of stream
    readable.pipe(uploadStream);
  });
};

module.exports = { cloudinary, uploadBufferToCloudinary };