const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller')
const uploadFile = require('../middlewares/multer')


const {
  verifyToken,
  isSeller,
  isSellerOrCostumer
} = require('../middlewares/auth')
const {
  checkInsertReview,
  checkUpdateReview
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, isSeller, reviewController.getAllReviews)
  .post('/', verifyToken, isSellerOrCostumer, uploadFile, checkInsertReview, reviewController.insertReview)
  .patch('/:id', verifyToken, isSellerOrCostumer, uploadFile, checkUpdateReview, reviewController.updateReview)
  .delete('/:id', verifyToken, isSellerOrCostumer, reviewController.deleteReview)
  .get('/product/:id', reviewController.getReviewByIdProduct)
  .get('/:id', reviewController.getReviewById)

module.exports = router