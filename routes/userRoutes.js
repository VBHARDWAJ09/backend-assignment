const express = require('express');
const router = express.Router();
const { registerValidations, loginValidations } = require('../validations/userValidations')

const { authorized } = require('../services/Authorization');
const { register, login, getUserDetails } = require('../controllers/usersController');


router.post('/register', registerValidations, register)
router.post('/login', loginValidations, login)
router.get('/user/:userId/books', getUserDetails)

module.exports = router;