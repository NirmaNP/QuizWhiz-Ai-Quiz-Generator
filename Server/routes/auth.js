const express = require('express');
const router = express.Router();
const User = require('../models/SignUpSchema');
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/" doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name (min 3 characters)').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 8 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).json({error:"Sorry a user with this email already exists"})
        }
        // Create user if validation passes
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;