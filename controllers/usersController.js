const { validationResult, Result } = require('express-validator');
const UserModel = require('../models/user')
const RecordModel = require('../models/record')
const { hashedPassword, comparePassword, createToken } = require('../services/authServices')

module.exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { username, email, password } = req.body;
        try {
            const userExist = await UserModel.findOne({ email: email })
            if (!userExist) {
                const hashed = await hashedPassword(password);
                const user = await UserModel.create({ username, email, password: hashed })
                const token = await createToken({ id: user._id, username })
                return res.status(200).json({ msg: "your account has been created successfully", token })
            } else {
                return res.status(402).json({ errors: [{ msg: `${email} already exists` }] })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const user = await UserModel.findOne({ email })
            if (user) {
                if (await comparePassword(password, user.password)) {
                    const token = await createToken({ id: user._id, name: user.name })
                    return res.status(201).json({ token, msg: "Login successful" })
                } else {
                    return res.status(410).json({ errors: [{ msg: `Incorrect Password` }] })
                }
            } else {
                return res.status(400).json({ errors: [{ msg: `${email} not exist` }] })
            }
        } catch (err) {
            return res.status(500).json("Internal server error")
        }
    } else {
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports.getUserDetails = async (req, res) => {
    const { userId } = req.params;
    if (userId) {
        try {
            const user = await UserModel.findOne({ _id: userId })
            if (user) {
                const allBooks = await RecordModel.find({ userId }).populate('bookId', '-quantities -__v -_id')
                const sanitizedBooks = allBooks.map(book => {
                    const { userId, bookId, _id, __v, ...restOfBookData } = book.toObject(); // Remove 'userId' property
                    restOfBookData['book_details'] = bookId
                    return restOfBookData;
                });
                return res.status(200).json({ data: sanitizedBooks })
            } else {
                return res.status(201).json({ msg: "User does not exist" })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } else {
        return res.status(400).json({ msg: "bookId is missing" })
    }
}