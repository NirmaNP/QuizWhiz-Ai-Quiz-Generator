const Results = require('../models/ResultSchema');
const express = require('express');
const router = express.Router();
const User = require('../models/SignUpSchema');
const fetchuser = require('../Middleware/fetchuser');
require('dotenv').config();

router.get('/GetUserResults', fetchuser, async (req, res) => {
    try {
        const userResults = await Results.find({ user: req.user.id }).sort({ date: -1 });
        res.json(userResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/SaveQuizResults', fetchuser, async (req, res) => {
    try {
        const { date, topic, difficulty, timeTaken, score, totalQuestions } = req.body;
        const newResult = new Results({
            user: req.user.id,
            date: date || new Date(),
            topic,
            difficulty,
            timeTaken,
            score,
            totalQuestions
        });

        await newResult.save();
        res.status(201).json({ message: 'Results saved successfully' });
    } catch (error) {
        console.error("Backend error:", error);
        res.status(500).json({
            message: 'Error saving results'
        });
    }
});

module.exports = router;