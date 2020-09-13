const queryHelper = require('../helpers/query')
const connection = require('../config/db.config')

const category = {
  getAllAddress: (id) => {
    return queryHelper(`SELECT * FROM address WHERE idUser = ${id} ORDER BY id desc`)
  },
  checkActiveAddress: (id) => {
    return queryHelper(`SELECT * FROM address WHERE idUser = ${id} AND active = 1 ORDER BY id desc`)
  },
  insertAddress: (newAddress) => {
    return queryHelper('INSERT INTO address SET ?', newAddress)
  },
  updateAddress: (newAddress, id) => {
    return queryHelper('UPDATE address SET ? WHERE id = ?', [newAddress, id])
  },
  deleteAddress: (id) => {
    return queryHelper('DELETE FROM address WHERE id = ?', id)
  },
  getAddressActive: (idUser) => {
    return queryHelper('SELECT * FROM address WHERE idUser = ? AND active = 1', idUser)
  },
  getAddressById: (id) => {
    return queryHelper('SELECT * FROM address WHERE id = ?', id)
  }
}

module.exports = category