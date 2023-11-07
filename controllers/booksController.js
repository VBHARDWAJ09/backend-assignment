const { validationResult, Result } = require('express-validator');
const BookModel = require('../models/book')

module.exports.addBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { name, author, quantities } = req.body;
        try {
            const checkExist = await BookModel.findOne({ name, author })
            if (!checkExist) {
                if (parseInt(quantities) > 0) {
                    await BookModel.create({ name, author, quantities })
                    return res.status(200).json({ msg: `${name} book by ${author} has been added successfully` })
                } else {
                    return res.status(402).json({ msg: `${quantities} invalid quantities please provide a valid number` })
                }
            } else {
                return res.status(402).json({ msg: `${name} book by ${author} already exist` })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await BookModel.find({})
        if (allBooks.length > 0) {
            const restData = allBooks.map((book) => {
                const { _id, __v, ...restOfBookData } = book.toObject();
                return restOfBookData;
            })
            return res.status(200).json({ data: restData })
        } else {
            return res.status(402).json({ msg: `Data not exist` })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports.getBook = async (req, res) => {
    const bookId = req.params.bookId
    try {
        const bookdata = await BookModel.find({ _id: bookId })
        if (bookdata.length > 0) {
            const restData = bookdata.map((book) => {
                const { _id, __v, ...restOfBookData } = book.toObject();
                return restOfBookData;
            })
            return res.status(200).json({ data: restData })
        } else {
            return res.status(402).json({ msg: `Book not exist` })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}