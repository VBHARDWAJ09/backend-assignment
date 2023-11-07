const express = require('express');
const router = express.Router();
const { addBookValidations } = require('../validations/bookValidations')
const { authorized } = require('../services/Authorization');
const { addBook, getAllBooks, getBook } = require('../controllers/booksController');


router.post('/books', addBookValidations, addBook)
router.get('/books', getAllBooks)
router.get('/books/:bookId', getBook)
module.exports = router;