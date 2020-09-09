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
  isSeller,
  isSellerOrCostumer
} = require('../middlewares/auth')
const {
  checkUpdateProfile,
  checkUpdateStore
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, isSeller, cacheAllUsers, userController.getAllUser)
  .patch('/profile/:id', verifyToken, isSellerOrCostumer, uploadFile, checkUpdateProfile, userController.updateProfile)
  .patch('/store/:id', verifyToken, isSeller, uploadFile, checkUpdateStore, userController.updateStore)

  .delete('/:id', verifyToken, isSellerOrCostumer, userController.deleteUser)
  .get('/:id', verifyToken, isSellerOrCostumer, cacheDetailUser, userController.getUserById)

module.exports = router