const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {
  checkSignup,
  checkLogin,
  checkReqResetPassword,
  checkChangePassword
} = require('../middlewares/formErrorHandling')

router
  .post('/signup', checkSignup, authController.signup)
  .post('/login', checkLogin, authController.login)
  .post('/verify-account', authController.verifyAccount)
  .post('/request-reset-password', checkReqResetPassword, authController.requestResetPassword)
  .post('/verify-reset-password', authController.verifyResetPassword)
  .post('/reset-password', checkChangePassword, authController.resetPassword)

module.exports = router