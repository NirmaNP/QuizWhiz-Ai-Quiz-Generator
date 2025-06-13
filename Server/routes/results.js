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

// In your backend routes file
router.post('/SaveQuizResults', fetchuser, async (req, res) => {
    try {
        const {
            date,
            topic,
            difficulty,
            timeTaken,
            score,
            totalQuestions,
            questions,
            config
        } = req.body;

        const newResult = new Results({
            user: req.user.id,
            date,
            topic,
            difficulty,
            timeTaken,
            score,
            totalQuestions,
            questions,
            config,
            percentage: Math.round((score / totalQuestions) * 100)
        });

        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/ClearUserResults', fetchuser, async (req, res) => {
    try {
        const deleted = await Results.deleteMany({ user: req.user.id });

        res.json({
            message: 'All results cleared successfully',
            deletedCount: deleted.deletedCount
        });
    } catch (error) {
        console.error('Error clearing results:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;