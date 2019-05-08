const mongoose = require('mongoose');

exports.Book = mongoose.model(
  'Book',
  new mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 255, required: true },
    genre: { type: String, minlength: 5, maxlength: 255, required: true },
    authorId: { type: String }
  })
);
