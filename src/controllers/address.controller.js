const addressModels = require('../models/address.model')
const helpers = require('../helpers/helpers')

const address = {
  getAllAddress: (req, res) => {
    const id = req.userId
    addressModels.getAllAddress(id)
      .then(response => {
        const resultAddress = response
        helpers.response(res, resultAddress, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },

  insertAddress: (req, res) => {
    const id = req.userId
    const {
      home,
      receiptName,
      address,
      city,
      receiptPhone,
      postalCode
    } = req.body
    const newAddress = {
      idUser: id,
      home,
      receiptName,
      address,
      city,
      receiptPhone,
      postalCode,
      active: 0
    }
    addressModels.insertAddress(newAddress)
      .then(response => {
        helpers.response(res, response, res.statusCode, helpers.status.insert, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  updateAddress: (req, res) => {
    const id = req.params.id
    const {
      home,
      receiptName,
      address,
      city,
      receiptPhone,
      postalCode
    } = req.body
    const newAddress = {
      home,
      receiptName,
      address,
      city,
      receiptPhone,
      postalCode
    }
    console.log(newAddress)
    addressModels.updateAddress(newAddress, id)
      .then(response => {
        helpers.response(res, response, res.statusCode, helpers.status.update, null)
      }).catch(err => {
        console.log(err)
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  setActiveAddress: (req, res) => {
    const id = req.params.id
    const idUser = req.userId
    const newAddress = {
      active: 1
    }
    addressModels.checkActiveAddress(idUser).then(resActive => {
      const idFound = resActive[0].id
      addressModels.updateAddress({
        active: 0
      }, idFound).then(change => {
        addressModels.updateAddress(newAddress, id)
          .then(response => {
            helpers.response(res, response, res.statusCode, helpers.status.update, null)
          }).catch(err => {
            console.log(err)
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      })
    }).catch(err => {
      addressModels.updateAddress(newAddress, id)
        .then(response => {
          helpers.response(res, response, res.statusCode, helpers.status.update, null)
        }).catch(err => {
          console.log(err)
          helpers.response(res, [], err.statusCode, null, null, err)
        })
    })
  },
  deleteAddress: (req, res) => {
    const id = req.params.id
    addressModels.deleteAddress(id).then(response => {
      const resultAddress = response
      helpers.response(res, resultAddress, res.statusCode, helpers.status.delete, null)
    }).catch(err => {
      helpers.response(res, [], err.statusCode, null, null, err)
    })
  },
  getAddressActive: (req, res) => {
    const id = req.userId
    addressModels.getAddressActive(id)
      .then(response => {
        const resultAddress = response
        helpers.response(res, resultAddress, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], 400, null, null, err)
      })
  }
}

module.exports = address