const { body } = require('express-validator')

module.exports.registerValidations = [
    body('username').not().isEmpty().trim().escape().withMessage('username is required'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').isLength({ min: 5 }).withMessage('password at least 5 characters')
]

module.exports.loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required')
]