const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

// Register user
router.post('/register', UserController.register); // This line seems correct

// Login user
router.post('/login', UserController.login); // This line also seems correct

// Get list of users
router.post('/users', UserController.userslist); // This line should be changed to use `router.get` instead of `router.post`

module.exports = router;
