const express = require('express');
const router = express.Router();
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
                role: admin.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
