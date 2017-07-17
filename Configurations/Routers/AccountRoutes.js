const express = require('express');
const passport = require('passport');
AuthController = require('../../Application/Controller-Service/Controllers/AuthenticationController');
UserController = require('../../Application/Controller-Service/Controllers/UserController');
passportService = require('../Passport/Passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

ApiRoutes = express.Router();
authRoutes = express.Router();
userRoutes = express.Router();

// Set Auth Routes
ApiRoutes.use('/auth', authRoutes);
// Login route
authRoutes.post('/login', requireLogin, AuthController.login);
// Registration route
authRoutes.post('/register', AuthController.register);

// Set User Routes
ApiRoutes.use('/user', userRoutes);
// Get user list
userRoutes.get('/', requireAuth, UserController.getList);

module.exports = ApiRoutes;