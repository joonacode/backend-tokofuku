const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const {
  verifyToken,
  isSeller,
  isSellerOrCostumer
} = require('../middlewares/auth')
const {
  checkProduct
} = require('../middlewares/formErrorHandling')
const uploadFile = require('../middlewares/multer')
const {
  cacheAllProducts
} = require('../middlewares/redis')

router
  .get('/', productController.getAllProduct)
  .post('/', verifyToken, isSeller, uploadFile, checkProduct, productController.insertProduct)
  .patch('/:id', verifyToken, isSeller, uploadFile, checkProduct, productController.updateProduct)
  .delete('/:id', verifyToken, isSeller, productController.deleteProduct)
  .get('/:id', productController.getProductById)
  .get('/no-paging', verifyToken, isSellerOrCostumer, cacheAllProducts, productController.getAllProductNoPaging)

module.exports = router