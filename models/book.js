const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    quantities: {
        required: true,
        type: Number
    }
}, { timestamp: true })

const BookModel = mongoose.model('book', bookSchema)
module.exports = BookModel;