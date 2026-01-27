// models/Flow.js
const mongoose = require('mongoose');

const flowSchema = mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

const Flow = mongoose.model('Flow', flowSchema);

module.exports = Flow;