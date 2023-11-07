const { validationResult, Result } = require('express-validator');
const UserModel = require('../models/user')

module.exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return res.status(201).json({ msg: "your account has been created successfully" })
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

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return res.status(201).json({ msg: "welcome" })

        // try {
        //     const user = await UserModel.findOne({ email })
        //     if (user) {
        //         if (await comparePassword(password, user.password)) {
        //             const token = await createToken({ id: user._id, name: user.name })
        //             return res.status(201).json({ token, admin: user.admin })
        //         } else {
        //             return res.status(401).json({ errors: [{ msg: `Incorrect Password` }] })
        //         }
        //     } else {
        //         return res.status(401).json({ errors: [{ msg: `${email} not exist` }] })
        //     }
        // } catch (err) {
        //     return res.status(500).json("Internal server error")
        // }
    } else {
        return res.status(401).json({ errors: errors.array() })
    }
}

module.exports.getUserDetails = async (req, res) => {
    const { userId } = req.params;
    if (userId) {
        return res.status(201).json({ msg: `${userId} details is here` })
    } else {
        return res.status(400).json({ msg: "bookId is missing" })
    }
}