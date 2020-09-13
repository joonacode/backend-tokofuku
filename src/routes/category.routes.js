const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const {
  verifyToken,
  isAdmin
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
  .post('/', verifyToken, isAdmin, uploadFile, checkCategory, categoryController.insertCategory)
  .patch('/:id', verifyToken, isAdmin, uploadFile, checkCategory, categoryController.updateCategory)
  .delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory)
  .get('/:id', categoryController.getCategoryById)

module.exports = router