const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  released: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  createdByUserId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
