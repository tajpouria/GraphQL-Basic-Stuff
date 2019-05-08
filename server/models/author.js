const mongoose = require('mongoose');

exports.Author = mongoose.model(
  'Author',
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 255, required: true },
    age: { type: Number, min: 0, max: 255 }
  })
);
