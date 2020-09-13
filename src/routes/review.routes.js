const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller')
const uploadFile = require('../middlewares/multer')


const {
  verifyToken,
  isAdmin,
  isASC,
  isCostumer
} = require('../middlewares/auth')
const {
  checkInsertReview,
  checkUpdateReview
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, isAdmin, reviewController.getAllReviews)
  .post('/', verifyToken, isCostumer, uploadFile, checkInsertReview, reviewController.insertReview)
  .patch('/:id', verifyToken, isCostumer, uploadFile, checkUpdateReview, reviewController.updateReview)
  .delete('/:id', verifyToken, isASC, reviewController.deleteReview)
  .get('/product/:id', reviewController.getReviewByIdProduct)
  .get('/:id', reviewController.getReviewById)

module.exports = router