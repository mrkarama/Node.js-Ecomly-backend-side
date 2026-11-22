const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const authControllers = require('../controllers/auth');

const validateUser = [
    body('name').not().isEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({min: 8})
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage('Password must contain at least one uppercase, one lowercase, and one symbol.'),
    body('phone').isMobilePhone().withMessage('Please enter a valid a phone number.')
];

router.post('/register', validateUser, authControllers.register);
router.post('/login', authControllers.login);

module.exports = router;