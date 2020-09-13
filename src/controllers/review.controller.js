const helpers = require('../helpers/helpers')
const reviewModels = require('../models/review.model')
const fs = require('fs')

const review = {
  getAllReviews: (req, res) => {
    const order = req.query.order || 'DESC'
    reviewModels
      .getAllReviews(order)
      .then((response) => {
        helpers.response(
          res,
          response,
          res.statusCode,
          helpers.status.found,
          null,
        )
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  insertReview: (req, res) => {
    const {
      idUser,
      idProduct,
      rating,
      description
    } = req.body

    let image
    if (req.file) image = req.file.path
    if (req.uploadErrorMessage) return helpers.response(res, [], 400, null, null, [req.uploadErrorMessage])
    const newReview = {
      idUser,
      idProduct,
      rating,
      description
    }
    if (image) newReview.images = `${process.env.BASE_URL}/${image}`
    reviewModels.insertReview(newReview)
      .then(response => {
        helpers.redisInstance().del('getAllProducts')
        helpers.response(res, response, res.statusCode, helpers.status.insert, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err.errno === 1452 ? ['User or product not found'] : err)
      })
  },
  updateReview: (req, res) => {
    const {
      rating,
      description,
      oldImage
    } = req.body

    const id = req.params.id
    let image
    if (req.file) image = req.file.path
    if (req.uploadErrorMessage)
      return helpers.response(res, [], 400, null, null, [
        req.uploadErrorMessage,
      ])

    let finalImage
    if (image) {
      if (oldImage === '' || oldImage === 'null' || oldImage === null || !oldImage) {
        finalImage = `${process.env.BASE_URL}/${image}`
      } else {
        finalImage = `${process.env.BASE_URL}/${image}`
        const pathDelete = oldImage.replace(process.env.BASE_URL, '.')
        fs.unlinkSync(pathDelete, (error) => {
          if (error) throw error
        })
      }
    } else {
      finalImage = oldImage
    }
    const newReview = {
      rating,
      description,
      images: finalImage,
      updatedAt: new Date()
    }
    reviewModels
      .updateReview(newReview, id)
      .then((response) => {
        helpers.response(
          res,
          response,
          res.statusCode,
          helpers.status.update,
          null,
        )
      })
      .catch((error) => {
        helpers.response(res, [], error.statusCode, null, null, error.errno === 1452 ? ['User or product not found'] : error)
      })
  },
  getReviewById: (req, res) => {
    const id = req.params.id
    reviewModels
      .getReviewById(id)
      .then((response) => {
        helpers.response(
          res,
          response,
          res.statusCode,
          helpers.status.found,
          null,
        )
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getReviewByIdProduct: (req, res) => {
    const id = req.params.id
    reviewModels
      .getReviewByIdProduct(id)
      .then((response) => {
        helpers.response(
          res,
          response,
          res.statusCode,
          helpers.status.found,
          null,
        )
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  deleteReview: (req, res) => {
    const id = req.params.id
    reviewModels
      .deleteReview(id)
      .then((response) => {
        helpers.response(
          res,
          response,
          res.statusCode,
          helpers.status.delete,
          null,
        )
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  }
}

module.exports = review