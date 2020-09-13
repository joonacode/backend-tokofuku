const connection = require('../config/db.config')
const queryHelper = require('../helpers/query')

const review = {
  getAllReviews: (order) => {
    console.log(order)
    return queryHelper(`SELECT * FROM reviews ORDER BY id ${order}`)
  },
  getReviewById: (id) => {
    return queryHelper('SELECT * FROM reviews WHERE id = ?', id)
  },
  getReviewByIdProduct: (id) => {
    return queryHelper('SELECT * FROM reviews WHERE idProduct = ?', id)
  },
  getReviewByIdProductAndIdUsr: (idProduct, idUser) => {
    return queryHelper('SELECT * FROM reviews WHERE idProduct = ? AND idUser = ?', [idProduct, idUser])
  },
  insertReview: (data) => {
    return queryHelper('INSERT INTO reviews SET ?', data)
  },
  updateReview: (data, id) => {
    return queryHelper('UPDATE reviews SET ? WHERE id = ?', [data, id])
  },
  deleteReview: (id) => {
    return queryHelper('DELETE FROM reviews WHERE id = ?', id)
  }

}
module.exports = review