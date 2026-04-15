const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage config for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderPath = "helix_forms";
    
    if (file.fieldname === "photo") {
      folderPath = "helix/photos";
    } else if (file.fieldname === "abstract") {
      folderPath = "helix/abstracts";
    } else if (file.fieldname === "biography") {
      folderPath = "helix/bios";
    }

    return {
      folder: folderPath,
      resource_type: "auto", // Supports PDF, DOCX, etc.
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;