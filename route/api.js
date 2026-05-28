const express = require('express');
const router = express.Router();

// API route example
router.get('/users', (req, res) => {
    res.json({ message: "Get all users (API)" });
});

router.post('/users', (req, res) => {
    res.json({ message: "Create user (API)" });
});

module.exports = router;