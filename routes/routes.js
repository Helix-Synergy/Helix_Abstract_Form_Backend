const express = require("express");
const router = express.Router();

const { submitForm, getAllForms } = require("../controllers/controllers");
const upload = require("../middleware/middleware");

// Multiple file fields
const uploadFields = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "abstract", maxCount: 1 },
  { name: "biography", maxCount: 1 }
]);

// POST
router.post("/submit", uploadFields, submitForm);

// GET
router.get("/all", getAllForms);

module.exports = router;