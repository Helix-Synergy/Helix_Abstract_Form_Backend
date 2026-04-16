const Form = require("../models/models");
const { uploadBufferToCloudinary } = require("../config/cloudinary");

/**
 * Upload a single file from multer memoryStorage to Cloudinary.
 * Returns { url, public_id } or { url: null, public_id: null } if no file.
 */
const uploadFile = async (files, fieldName, folder, resourceType = "auto") => {
  const file = files?.[fieldName]?.[0];
  if (!file) return { url: null, public_id: null };

  const sanitizedName = file.originalname.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_");

  const result = await uploadBufferToCloudinary(file.buffer, {
    folder,
    resource_type: resourceType,
    public_id: `${Date.now()}-${sanitizedName}`,
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

// POST - Submit Form
exports.submitForm = async (req, res) => {
  try {
    const { firstName, lastName, affiliation, university, country, tracks } = req.body;

    // Upload all three files in parallel for speed
    const [photoFile, abstractFile, bioFile] = await Promise.all([
      uploadFile(req.files, "photo", "helix/photos", "image"),
      uploadFile(req.files, "abstract", "helix/abstracts", "auto"),
      uploadFile(req.files, "biography", "helix/bios", "auto"),
    ]);

    const newForm = new Form({
      firstName,
      lastName,
      affiliation,
      university,
      country,
      tracks,
      photo: photoFile,
      abstract: abstractFile,
      biography: bioFile,
    });

    await newForm.save();

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm,
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET - All Submissions (Admin)
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: forms.length,
      data: forms,
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};