const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const {
  verifyToken,
  isAdminOrSeller,
  isASC,
  isAdmin,
  isCostumer,
  isAdminOrCostumer
} = require('../middlewares/auth')
const {
  cacheAllHistories,
  cacheMyHistories
} = require('../middlewares/redis')

const {
  checkOrder,
  checkSendInvoiceToEmail
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, isAdmin, orderController.getAllOrder)
  .get('/status/:status', verifyToken, isCostumer, orderController.getByStatus)
  .post('/', verifyToken, isCostumer, checkOrder, orderController.insertOrder)
  .post('/send-email-receipt', verifyToken, isASC, checkSendInvoiceToEmail, orderController.sendEmailMember)
  .patch('/status/:id', verifyToken, isASC, orderController.updateStatusOrder)
  .delete('/:id', verifyToken, isAdminOrCostumer, orderController.deleteOrder)
  .get('/myorder', verifyToken, isASC, orderController.getMyOrder)
  .get('/:id', verifyToken, isASC, orderController.getOrderById)

module.exports = router