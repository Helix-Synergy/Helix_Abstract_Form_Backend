const cloudinary = require('./config/cloudinary');
const dotenv = require('dotenv');
dotenv.config();

// Re-configure to be sure it's using the latest env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log("Testing Cloudinary connection with:");
console.log("Cloud Name:", process.env.CLOUD_NAME);

cloudinary.api.ping()
  .then(result => {
    console.log("Ping successful:", result);
    process.exit(0);
  })
  .catch(err => {
    console.error("Ping failed:", err);
    process.exit(1);
  });
