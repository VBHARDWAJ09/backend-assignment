const { body } = require('express-validator')

module.exports.recordValidations = [
    body('userId').isLength({ min: 3 }).trim().escape().withMessage('userId is required'),
    body('bookId').isLength({ min: 3 }).withMessage('bookId at least 5 characters'),
    body('quantities').not().isEmpty().trim().escape().withMessage("quantities is required")
]