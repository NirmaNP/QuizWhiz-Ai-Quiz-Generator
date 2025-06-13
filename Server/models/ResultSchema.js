// models/Results.js
const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails', required: true },
    date: { type: Date, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    timeTaken: { type: Number, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    questions: [{
        questionText: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        userAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
}, { timestamps: true });

const ResultsModel = mongoose.model("Results", resultsSchema)
module.exports = ResultsModel