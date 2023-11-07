const { body } = require('express-validator')

module.exports.addBookValidations = [
    body('name').isLength({ min: 3 }).trim().escape().withMessage('name is required'),
    body('author').isLength({ min: 3 }).withMessage('author at least 5 characters'),
    body('quantities').not().isEmpty().trim().escape().withMessage("quantities is required")
]