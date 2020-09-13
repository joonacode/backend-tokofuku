const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const uploadFile = require('../middlewares/multer')

const {
  cacheAllUsers,
  cacheDetailUser
} = require('../middlewares/redis')
const {
  verifyToken,
  isAdmin,
  isAdminOrSeller,
  isASC
} = require('../middlewares/auth')
const {
  checkUpdateProfile,
  checkUpdateStore
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, isAdmin, cacheAllUsers, userController.getAllUser)
  .patch('/profile/:id', verifyToken, isASC, uploadFile, checkUpdateProfile, userController.updateProfile)
  .patch('/store/:id', verifyToken, isAdminOrSeller, uploadFile, checkUpdateStore, userController.updateStore)

  .delete('/:id', verifyToken, isAdmin, userController.deleteUser)
  .get('/profile', verifyToken, isASC, cacheDetailUser, userController.getUserById)

module.exports = router