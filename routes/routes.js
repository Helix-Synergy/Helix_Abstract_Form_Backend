const express = require("express");
const router = express.Router();
const { submitForm, getAllForms } = require("../controllers/controllers");
const upload = require("../middleware/middleware");

const uploadFields = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "abstract", maxCount: 1 },
  { name: "biography", maxCount: 1 },
]);

router.post("/submit", uploadFields, submitForm);
router.get("/all", getAllForms);

module.exports = router;