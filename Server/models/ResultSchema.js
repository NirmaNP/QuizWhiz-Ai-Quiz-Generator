// models/Results.js
const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  timeTaken: { type: Number, required: true }, 
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Results', resultsSchema);