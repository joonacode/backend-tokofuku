const bcrypt = require('bcrypt')
const saltRounds = 12
const helpers = require('../helpers/helpers')
const errorHandling = require('../helpers/errorHandling')
const userModels = require('../models/user.model')
const fs = require('fs')

const user = {
  getAllUser: (req, res) => {
    const id = req.userId
    if (!id) return helpers.response(res, [], 400, null, null, ['Id not found'])
    const order = req.query.order || 'DESC'
    userModels
      .getAllUser(id, order)
      .then((response) => {
        const newResponse = response
        helpers
          .redisInstance()
          .setex('getAllUsers', 60 * 60 * 12, JSON.stringify(newResponse))
        helpers.response(res, newResponse, 200, helpers.status.found, [])
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getUserById: (req, res) => {
    const id = req.params.id
    userModels
      .getUserById(id)
      .then((response) => {
        const newRes = response[0]
        delete newRes.password
        helpers
          .redisInstance()
          .setex('getDetailUser', 60 * 60 * 12, JSON.stringify(newRes))
        helpers.response(res, newRes, 200, helpers.status.found, [])
      })
      .catch((err) => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  updateProfile: async (req, res) => {
    const {
      name,
      oldImage,
      phone,
      gender,
      dateBirth
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
    const newUser = {
      name,
      phone,
      image: finalImage,
      gender,
      dateBirth,
      updatedAt: new Date()
    }
    userModels
      .updateUser(newUser, id)
      .then((response) => {
        helpers.redisInstance().del('getAllUsers')
        userModels
          .getUserById(id)
          .then((responseUser) => {
            const resultUser = responseUser[0]
            delete resultUser.password
            helpers.response(
              res,
              resultUser,
              res.statusCode,
              helpers.status.update,
              null,
            )
          })
          .catch((err) => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      })
      .catch((error) => {
        helpers.response(
          res,
          [],
          error.statusCode,
          null,
          null,
          error.errno === 1452 ? ['Role not found'] : error,
        )
      })
  },
  updateStore: async (req, res) => {
    const {
      storeName,
      phone,
      storeDescription,
      oldImage,
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
    const newUser = {
      storeName,
      phone,
      storeDescription,
      storeImage: finalImage,
      updatedAt: new Date()
    }
    userModels
      .updateUser(newUser, id)
      .then((response) => {
        helpers.redisInstance().del('getAllUsers')
        userModels
          .getUserById(id)
          .then((responseUser) => {
            const resultUser = responseUser[0]
            delete resultUser.password
            helpers.response(
              res,
              resultUser,
              res.statusCode,
              helpers.status.update,
              null,
            )
          })
          .catch((err) => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      })
      .catch((error) => {
        helpers.response(
          res,
          [],
          error.statusCode,
          null,
          null,
          error.errno === 1452 ? ['Role not found'] : error,
        )
      })
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    userModels
      .deleteUser(id)
      .then((response) => {
        const resultUser = response
        resultUser.userId = Number(id)
        helpers.redisInstance().del('getAllUsers')
        helpers.redisInstance().del('getDetailUser')
        helpers.response(
          res,
          resultUser,
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

module.exports = user