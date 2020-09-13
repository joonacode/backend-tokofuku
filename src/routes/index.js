const express = require('express')

const routeProduct = require('./product.routes')
const routeCategory = require('./category.routes')
const routeUser = require('./user.routes')
const routeAuth = require('./auth.routes')
const routeReview = require('./review.routes')
const routeOrder = require('./order.routes')
const routeAddress = require('./address.routes')
const router = express.Router()

router
  .use('/products', routeProduct)
  .use('/categories', routeCategory)
  .use('/users', routeUser)
  .use('/auth', routeAuth)
  .use('/reviews', routeReview)
  .use('/orders', routeOrder)
  .use('/address', routeAddress)

module.exports = router