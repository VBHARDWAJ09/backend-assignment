const mongoose = require('mongoose')
const recordSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    bookId: { type: mongoose.Types.ObjectId, ref: 'book' },
    quantities: {
        required: true,
        type: Number
    },
    isReturn: {
        type: Boolean,
        required: true
    }
}, { timestamp: true })

const RecordModel = mongoose.model('record', recordSchema)
module.exports = RecordModel;