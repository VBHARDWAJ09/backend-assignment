const { validationResult, Result } = require('express-validator');
const BookModel = require('../models/book')

module.exports.addBook = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return res.status(201).json({ msg: "your book is added" })
        // const { name, email, password } = req.body;
        // try {
        //     const emailExist = await UserModel.findOne({ email: email })
        //     if (!emailExist) {
        //         const hashed = await hashedPassword(password);
        //         const user = await UserModel.create({ name, email, password: hashed, phone, admin: false })
        //         const token = await createToken({ id: user._id, name })
        //         return res.status(201).json({ msg: "your account has been created successfully", token })
        //     } else {
        //         return res.status(401).json({ errors: [{ msg: `${email} already exists` }] })
        //     }
        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports.getAllBooks = async (req, res) => {
    return res.status(200).json({ msg: "getAllBooks" })
}

module.exports.getBook = async (req, res) => {
    const bookId = req.params.bookId
    return res.status(200).json({ msg: "getAllBooks " + bookId + " from here" })
}