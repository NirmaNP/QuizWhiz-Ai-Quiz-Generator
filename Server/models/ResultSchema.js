// models/Results.js
const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails'
  },
  date: { type: Date, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  timeTaken: { type: Number, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
}, { timestamps: true });

const ResultsModel = mongoose.model("Results", resultsSchema)
module.exports = ResultsModel