const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {
  checkSignup,
  checkLogin,
} = require('../middlewares/formErrorHandling')

router
  .post('/signup', checkSignup, authController.signup)
  .post('/login', checkLogin, authController.login)
  .post('/verify-account', authController.verifyAccount)

module.exports = router