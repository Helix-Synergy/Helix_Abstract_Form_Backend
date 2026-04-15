const Form = require("../models/models");

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

    const newForm = new Form({
      firstName,
      lastName,
      affiliation,
      university,
      country,
      tracks,
      photo: req.files.photo?.[0]?.path,
      abstract: req.files.abstract?.[0]?.path,
      biography: req.files.biography?.[0]?.path
    });

    await newForm.save();

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - All Submissions (Admin)
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });

    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};