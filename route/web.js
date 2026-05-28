const express = require('express');
const router = express.Router();

// Web route example
router.get('/', (req, res) => {
    res.send('Home Page');
});

router.get('/about', (req, res) => {
    res.send('About Page');
});

module.exports = router;