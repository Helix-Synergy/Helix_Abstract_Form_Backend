const Form = require("../models/models");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Helper function to upload + safely delete local file
const handleUpload = async (file) => {
  const filePath = file.path;

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "forms"
  });

  // Delete ONLY if local file exists
  if (filePath && !filePath.startsWith("http") && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return result.secure_url;
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

    let photoUrl = null;
    let abstractUrl = null;
    let biographyUrl = null;

    // Upload Photo
    if (req.files?.photo) {
      photoUrl = await handleUpload(req.files.photo[0]);
    }

    // Upload Abstract
    if (req.files?.abstract) {
      abstractUrl = await handleUpload(req.files.abstract[0]);
    }

    // Upload Biography
    if (req.files?.biography) {
      biographyUrl = await handleUpload(req.files.biography[0]);
    }

    const newForm = new Form({
      firstName,
      lastName,
      affiliation,
      university,
      country,
      tracks,
      photo: photoUrl,
      abstract: abstractUrl,
      biography: biographyUrl
    });

    await newForm.save();

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm
    });

  } catch (error) {
    console.error("Error:", error);
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