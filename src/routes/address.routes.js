const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address.controller')
const {
  verifyToken,
  isCostumer
} = require('../middlewares/auth')

const {
  checkAddress
} = require('../middlewares/formErrorHandling')

router
  .get('/', verifyToken, addressController.getAllAddress)
  .post('/', verifyToken, isCostumer, checkAddress, addressController.insertAddress)
  .patch('/:id', verifyToken, isCostumer, checkAddress, addressController.updateAddress)
  .patch('/set-active/:id', verifyToken, isCostumer, addressController.setActiveAddress)
  .delete('/:id', verifyToken, isCostumer, addressController.deleteAddress)
  .get('/active', verifyToken, isCostumer, addressController.getAddressActive)

module.exports = router