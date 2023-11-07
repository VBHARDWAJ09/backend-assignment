const express = require('express');
const router = express.Router();
const { addBookValidations } = require('../validations/bookValidations')
const { authorized } = require('../services/Authorization');
const { addBook, getAllBooks, getBook } = require('../controllers/booksController');


router.post('/books', [authorized, addBookValidations], addBook)
router.get('/books', [authorized], getAllBooks)
router.get('/books/:bookId', [authorized], getBook)

module.exports = router;