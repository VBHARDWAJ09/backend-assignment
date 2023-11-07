const express = require('express');
const router = express.Router();
const { recordValidations } = require('../validations/recordsValidations')

const { authorized } = require('../services/Authorization');
const { borrowBook, returnBook } = require('../controllers/recordsController');


router.post('/borrow', recordValidations, borrowBook)
router.post('/return', recordValidations, returnBook)

module.exports = router;