const { validationResult, Result } = require('express-validator');
const RecordModel = require('../models/record')

module.exports.borrowBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { userId, bookId } = req.body;
        if (userId && bookId) {
            return res.status(201).json({ msg: `${userId} got this book ${bookId}` })
        } else {
            return res.status(201).json({ msg: `${userId} or ${bookId} is missing` })
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports.returnBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { userId, bookId } = req.body;
        if (userId && bookId) {
            return res.status(201).json({ msg: `${userId} got this book ${bookId}` })
        } else {
            return res.status(201).json({ msg: `${userId} or ${bookId} is missing` })
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}