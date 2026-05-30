const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Api/AuthController');
const UserController = require('../controllers/Api/UserController');

// API route example
router.post('/login', AuthController.authUser);

router.post('/users-list', UserController.usersList);
router.post('/add-user', UserController.addUser);

router.post('/users', (req, res) => {
    res.json({ message: "Create user (API)" });
});

module.exports = router;