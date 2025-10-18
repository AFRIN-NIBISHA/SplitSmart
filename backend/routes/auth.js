const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: 'User already exists' });
        const newUser = new User({ name, email, passwordHash: password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, userId: user._id, name: user.name });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
