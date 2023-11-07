const express = require('express');
const router = express.Router();
const { boorowValidations, returnBookValidations } = require('../validations/recordsValidations')
const { authorized } = require('../services/Authorization');
const { borrowBook, returnBook } = require('../controllers/recordsController');


router.post('/borrow', [authorized, boorowValidations], borrowBook)
router.post('/return', [authorized, returnBookValidations], returnBook)

module.exports = router;