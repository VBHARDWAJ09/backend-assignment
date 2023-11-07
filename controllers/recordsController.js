const { validationResult, Result } = require('express-validator');
const RecordModel = require('../models/record')
const UserModel = require('../models/user')
const BookModel = require('../models/book')

module.exports.borrowBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { userId, bookId, quantities } = req.body;
        try {
            if (userId && bookId) {
                if (+quantities > 0) {
                    const userDetails = await UserModel.findOne({ _id: userId })
                    const bookDetails = await BookModel.findOne({ _id: bookId })
                    if (!userDetails || !bookDetails) {
                        return res.status(402).json({ msg: `User or Book doest not exist` })
                    } else {
                        if (bookDetails.quantities > 0 && bookDetails.quantities >= quantities) {
                            const alreadyExist = await RecordModel.find({ userId, bookId, isReturn: false })
                            if (alreadyExist.length > 0) {
                                return res.status(201).json({ msg: `${userDetails.username} already has ${bookDetails.name} book` })
                            } else {
                                await BookModel.updateOne({ _id: bookId }, { $set: { "quantities": bookDetails.quantities - quantities } })
                                await RecordModel.create({ userId, bookId, quantities, isReturn: false })
                                return res.status(200).json({ msg: "record has been added successfully" })
                            }
                        } else {
                            return res.status(202).json({ msg: `Insufficient no of books` })
                        }
                    }
                }
                else {
                    return res.status(400).json({ msg: `${quantities} invalid number` })
                }
            } else {
                return res.status(400).json({ msg: `${userId} or ${bookId} is missing` })
            }
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    } else {
        // validation failed
        return res.status(500).json({ errors: errors.array() })
    }
}

module.exports.returnBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { userId, bookId } = req.body;
        if (userId && bookId) {
            try {
                const hasBook = await RecordModel.findOne({ userId, bookId, isReturn: false })
                if (hasBook) {
                    await RecordModel.updateOne({ _id: hasBook._id }, { $set: { "isReturn": true } })
                    const bookDetails = await BookModel.findOne({ _id: bookId })
                    await BookModel.updateOne({ _id: bookId }, { $set: { "quantities": bookDetails.quantities + hasBook.quantities } })
                    return res.status(200).json({ msg: `Successfully returned` })
                } else {
                    return res.status(202).json({ msg: `User does not have this book` })
                }
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        } else {
            return res.status(201).json({ msg: `${userId} or ${bookId} is missing` })
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}