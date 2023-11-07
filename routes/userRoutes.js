const express = require('express');
const router = express.Router();
const { registerValidations, loginValidations } = require('../validations/userValidations')

const { authorized } = require('../services/Authorization');
const { register, login, getUserDetails } = require('../controllers/usersController');


router.post('/user', registerValidations, register)
router.post('/user/login', loginValidations, login)
router.get('/user/:userId/books', [authorized], getUserDetails)

module.exports = router;