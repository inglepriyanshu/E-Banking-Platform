const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate JWT token
function generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}

// Function to verify JWT token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded.user; // Extract user data from token
    } catch (error) {
        return null; // Token verification failed
    }
}

module.exports = { generateToken, verifyToken };
