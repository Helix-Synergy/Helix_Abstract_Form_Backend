const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "photo") {
      cb(null, "uploads/photos/");
    } else if (file.fieldname === "abstract") {
      cb(null, "uploads/abstracts/");
    } else if (file.fieldname === "biography") {
      cb(null, "uploads/bios/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;