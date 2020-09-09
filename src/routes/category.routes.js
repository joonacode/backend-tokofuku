const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const {
  verifyToken,
  isSeller
} = require('../middlewares/auth')
const {
  cacheAllCategories
} = require('../middlewares/redis')
const {
  checkCategory
} = require('../middlewares/formErrorHandling')
const uploadFile = require('../middlewares/multer')

router
  .get('/', cacheAllCategories, categoryController.getAllCategory)
  .post('/', verifyToken, isSeller, uploadFile, checkCategory, categoryController.insertCategory)
  .patch('/:id', verifyToken, isSeller, uploadFile, checkCategory, categoryController.updateCategory)
  .delete('/:id', verifyToken, isSeller, categoryController.deleteCategory)
  .get('/:id', categoryController.getCategoryById)

module.exports = router