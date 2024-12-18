const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
