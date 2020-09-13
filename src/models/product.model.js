const queryHelper = require('../helpers/query')
const product = {

  getTotal: () => {
    return queryHelper('SELECT COUNT(*) AS total FROM products')
  },
  getTotalCategory: (idCategory) => {
    return queryHelper('SELECT COUNT(*) AS total FROM products WHERE idCategory = ?', idCategory)
  },
  getTotalSearch: (query) => {
    return queryHelper('SELECT * FROM products WHERE name LIKE ?', `%${query}%`)
  },
  getTotalSearchCategory: (idCategory, query) => {
    return queryHelper('SELECT * FROM products WHERE idCategory = ? AND name LIKE ?', [idCategory, `%${query}%`])
  },
  getAllProduct: (limit, offset, search, order, sorting) => {
    if (!order) {
      order = 'id'
    }
    const query = `SELECT products.*, categories.name as categoryName, users.storeName FROM products JOIN categories on products.idCategory = categories.id INNER JOIN users on products.idUser = users.id ${search ? `WHERE products.name LIKE '%${search}%'` : ''} ORDER BY ${order} ${sorting} LIMIT ${limit} OFFSET ${offset}`
    return queryHelper(query)
  },
  getProductByCategory: (idCategory, limit, offset, search, order, sorting) => {
    if (!order) {
      order = 'id'
    }
    const query = `SELECT products.*, categories.name as categoryName, users.storeName FROM products JOIN categories on products.idCategory = categories.id INNER JOIN users on products.idUser = users.id WHERE idCategory = ${idCategory} ${search ? `AND products.name LIKE '%${search}%'` : ''} ORDER BY ${order} ${sorting} LIMIT ${limit} OFFSET ${offset}`
    return queryHelper(query)
  },
  getRandomProduct: () => {
    const query = `SELECT products.*, categories.name as categoryName, users.storeName FROM products JOIN categories on products.idCategory = categories.id INNER JOIN users on products.idUser = users.id ORDER BY RAND() LIMIT 8`
    return queryHelper(query)
  },
  getAllProductNoPaging: () => {
    const query = `SELECT products.*, categories.name as categoryName FROM products JOIN categories on products.idCategory = categories.id ORDER BY id DESC`
    return queryHelper(query)
  },
  insertProduct: (newProduct) => {
    return queryHelper('INSERT INTO products SET ?', newProduct)
  },
  updateProduct: (newProduct, id) => {
    return queryHelper('UPDATE products SET ? WHERE id = ?', [newProduct, id])
  },
  deleteProduct: (id) => {
    return queryHelper('DELETE FROM products WHERE id = ?', id)
  },
  getProductById: (id) => {
    return queryHelper('SELECT products.*, users.storeName, categories.name as categoryName FROM products JOIN categories on products.idCategory = categories.id INNER JOIN users on products.idUser = users.id WHERE products.id = ?', id)
  },
  getMyProduct: (id) => {
    return queryHelper('SELECT products.*, users.storeName, categories.name as categoryName FROM products JOIN categories on products.idCategory = categories.id INNER JOIN users on products.idUser = users.id WHERE products.idUser = ?', id)
  }
}

module.exports = product