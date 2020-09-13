const productModels = require('../models/product.model')
const helpers = require('../helpers/helpers')
const fs = require('fs')
let totalData
const product = {
  getAllProduct: (req, res) => {
    const limit = Number(req.query.limit) || 9
    const page = !req.query.page ? 1 : req.query.page
    const offset = (Number(page) === 0 ? 1 : page - 1) * limit
    const search = req.query.search || null
    const order = req.query.order
    const sorting = req.query.sorting || 'asc'

    if (search) {
      productModels.getTotalSearch(search).then(response => {
        totalData = response.length
      }).catch(err => console.log(err))
    } else {
      productModels.getTotal().then(response => {
        totalData = response[0].total
      }).catch(err => console.log(err))
    }
    productModels.getAllProduct(limit, offset, search, order, sorting)
      .then(response => {
        const resultProduct = response
        const count = resultProduct.length
        const total = totalData
        const links = helpers.links(limit, page, total, count)
        helpers.response(res, resultProduct, 200, helpers.status.found, links)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getProductByCategory: (req, res) => {
    const limit = Number(req.query.limit) || 9
    const page = !req.query.page ? 1 : req.query.page
    const offset = (Number(page) === 0 ? 1 : page - 1) * limit
    const search = req.query.search || null
    const order = req.query.order
    const sorting = req.query.sorting || 'asc'
    const idCategory = req.query.idCategory
    if (!idCategory) return helpers.response(res, [], 400, null, null, ['Category required'])

    if (search) {
      productModels.getTotalSearchCategory(idCategory, search).then(response => {
        totalData = response.length
      }).catch(err => console.log(err))
    } else {
      productModels.getTotalCategory(idCategory).then(response => {
        totalData = response[0].total
      }).catch(err => console.log(err))
    }
    productModels.getProductByCategory(idCategory, limit, offset, search, order, sorting)
      .then(response => {
        const resultProduct = response
        const count = resultProduct.length
        const total = totalData
        const links = helpers.links(limit, page, total, count)
        helpers.response(res, resultProduct, 200, helpers.status.found, links)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getAllProductNoPaging: (req, res) => {
    productModels.getAllProductNoPaging()
      .then(response => {
        helpers.response(res, response, 200, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getMyProduct: (req, res) => {
    const id = req.userId
    productModels.getMyProduct(id)
      .then(response => {
        helpers.response(res, response, 200, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getRandomProduct: (req, res) => {
    productModels.getRandomProduct()
      .then(response => {
        helpers.response(res, response, 200, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },

  insertProduct: (req, res) => {
    const tampung = req.files
    console.log(req.files)
    const asd = tampung.map(item => {
      return `${process.env.BASE_URL}/${item.path}`
    })
    const {
      name,
      price,
      idCategory,
      stock,
      color,
      size,
      description,
      conditionProduct
    } = req.body

    let image
    if (req.files) image = asd.join(', ')
    if (req.uploadErrorMessage) return helpers.response(res, [], 400, null, null, [req.uploadErrorMessage])
    if (!image) return helpers.response(res, [], 400, null, null, ['Image required'])

    const newProduct = {
      name,
      idUser: req.userId,
      price,
      idCategory,
      stock,
      color,
      size,
      watch: 0,
      description,
      image: image,
      conditionProduct
    }
    productModels.insertProduct(newProduct)
      .then(response => {
        productModels.getProductById(response.insertId)
          .then(response => {
            const resultProduct = response
            helpers.response(res, resultProduct, res.statusCode, helpers.status.insert, null)
          }).catch(err => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err.errno === 1452 ? ['Category not found'] : err)
      })
  },

  updateProduct: (req, res) => {
    const {
      name,
      price,
      idCategory,
      stock,
      color,
      size,
      description,
      conditionProduct,
      oldImage
    } = req.body

    let image
    if (req.file) image = req.file.path
    if (req.uploadErrorMessage) return helpers.response(res, [], 400, null, null, [req.uploadErrorMessage])

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
    const newProduct = {
      name,
      price,
      idCategory,
      stock,
      color,
      size,
      description,
      image: finalImage,
      conditionProduct,
      updatedAt: new Date()
    }
    const id = req.params.id
    productModels.updateProduct(newProduct, id)
      .then(response => {
        productModels.getProductById(id)
          .then(responseResult => {
            const resultProduct = responseResult
            helpers.response(res, resultProduct, res.statusCode, helpers.status.update, null)
          }).catch(err => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err.errno === 1452 ? ['Category not found'] : err)
      })
  },

  deleteProduct: (req, res) => {
    const id = req.params.id
    productModels.getProductById(id)
      .then(response => {
        const resultProduct = response[0].image
        const pathDelete = resultProduct.replace(process.env.BASE_URL, '.')
        fs.unlinkSync(pathDelete, error => {
          if (error) throw error
        })
        productModels.deleteProduct(id)
          .then(response => {
            const resultProduct = response
            helpers.response(res, resultProduct, res.statusCode, helpers.status.delete, null)
          }).catch(err => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },

  getProductById: (req, res) => {
    const id = req.params.id

    productModels.getProductById(id)
      .then(response => {
        const resultProduct = response
        productModels.updateProduct({
          watch: response[0].watch + 1
        }, id).then(rest => {
          console.log('+1')
        }).catch(errs => {
          helpers.response(res, [], errs.statusCode, null, null, errs)
        })
        helpers.response(res, resultProduct, res.statusCode, helpers.status.found)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  }
}

module.exports = product