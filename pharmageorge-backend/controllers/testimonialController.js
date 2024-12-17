const Testimonial = require('../models/Testimonial.');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const { name, text, imageUrl } = req.body;
    const newTestimonial = new Testimonial({ name, text, imageUrl });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
