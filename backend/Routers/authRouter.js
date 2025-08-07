const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// ✅ FIXED HERE
const router = require('express').Router();

router.post('/login',loginValidation, login);

// Signup route with validation and controller
router.post('/signup', signupValidation, signup);

module.exports = router;
