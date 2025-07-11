// Authentication routes

const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

// POST /login
router.post('/login', login);

// POST /logout
router.post('/logout', logout);

module.exports = router; 