const express = require('express');
const router = express.Router();

const {
    loginUser,
    registerUser
} = require('../controllers/userController');

// login
router.post('/login', loginUser);

// register
router.post('/register', registerUser);

module.exports = router;