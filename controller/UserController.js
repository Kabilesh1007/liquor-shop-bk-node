const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for user registration
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
};


// Controller for user login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'this-can-be-any-random-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Controller to get list of users
exports.userslist = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
