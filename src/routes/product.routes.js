const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const {
  verifyToken,
  isAdminOrSeller,
  isSeller
} = require('../middlewares/auth')
const {
  checkProduct
} = require('../middlewares/formErrorHandling')
const uploadFile = require('../middlewares/multer')
const uploadFileArr = require('../middlewares/multerMultiple')
const {
  cacheAllProducts
} = require('../middlewares/redis')

router
  .get('/', productController.getAllProduct)
  .get('/by-category', productController.getProductByCategory)
  .get('/my-product', verifyToken, isAdminOrSeller, productController.getMyProduct)
  .get('/random', productController.getRandomProduct)
  .post('/', verifyToken, isAdminOrSeller, uploadFileArr, checkProduct, productController.insertProduct)
  .patch('/:id', verifyToken, isAdminOrSeller, uploadFile, checkProduct, productController.updateProduct)
  .delete('/:id', verifyToken, isAdminOrSeller, productController.deleteProduct)
  .get('/:id', productController.getProductById)
  .get('/no-paging', verifyToken, cacheAllProducts, productController.getAllProductNoPaging)

module.exports = router