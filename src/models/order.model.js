const queryHelper = require('../helpers/query')

const order = {
  getAllOrder: (order) => {
    return queryHelper(`SELECT * FROM orders ORDER BY id ${!order ? 'desc' : order}`)
  },
  getMyOrder: (order, id) => {
    return queryHelper(`SELECT * FROM orders WHERE idUser = ${id} ORDER BY id ${!order ? 'desc' : order}`)
  },
  getByStatus: (status, id) => {
    return queryHelper(`SELECT * FROM orders WHERE idUser = ${id} AND status = ${status} ORDER BY id DESC`)
  },
  insertOrder: (newOrder) => {
    return queryHelper('INSERT INTO orders SET ?', newOrder)
  },
  updateOrder: (newOrder, id) => {
    return queryHelper('UPDATE orders SET ? WHERE id = ?', [newOrder, id])
  },
  deleteOrder: (id) => {
    return queryHelper('DELETE FROM orders WHERE id = ?', id)
  },
  getOrderById: (id) => {
    return queryHelper('SELECT * FROM orders WHERE id = ?', id)
  }
}

module.exports = order