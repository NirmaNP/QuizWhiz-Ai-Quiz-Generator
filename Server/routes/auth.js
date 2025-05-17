const express = require('express');
const router = express.Router();
const User = require('../models/SignUpSchema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser= require('../Middleware/fetchuser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123456789';

//Route 1
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

        const salt=await bcrypt.genSalt(10);
        const securepass=await bcrypt.hash(req.body.password,salt);

        // Create user if validation passes
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepass
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//Route 2
router.post('/checkuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "No such account exists" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        console.log("Login successful");

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


//Route 3
router.post('/getuser', fetchuser , async (req, res) => {
    try {
        userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server error');
    }
});

module.exports = router;