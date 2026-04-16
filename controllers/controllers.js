const Form = require("../models/models");

// Helper to extract Cloudinary info from a multer-storage-cloudinary file object
const extractCloudinaryFile = (files, fieldName) => {
  const file = files?.[fieldName]?.[0];
  if (!file) return { url: null, public_id: null };
  return {
    url: file.path,       // multer-storage-cloudinary stores the secure URL in .path
    public_id: file.filename, // and the public_id in .filename
  };
};

// POST - Submit Form
exports.submitForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      affiliation,
      university,
      country,
      tracks
    } = req.body;

    const photoFile    = extractCloudinaryFile(req.files, "photo");
    const abstractFile = extractCloudinaryFile(req.files, "abstract");
    const bioFile      = extractCloudinaryFile(req.files, "biography");

    const newForm = new Form({
      firstName,
      lastName,
      affiliation,
      university,
      country,
      tracks,
      photo:     photoFile,
      abstract:  abstractFile,
      biography: bioFile,
    });

    await newForm.save();

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// GET - All Submissions (Admin)
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: forms.length,
      data: forms
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};