const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const Users = require('../../Model/user');

const app = express();
const secretKey = process.env.SECRET;

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = Users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        // Send token as response
        res.json({ token });
    });
});

module.exports = router;
