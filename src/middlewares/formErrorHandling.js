const helpers = require('../helpers/helpers')
const errorHandling = require('../helpers/errorHandling')
const reviewModels = require('../models/review.model')
const tokenModels = require('../models/token.model')
const userModels = require('../models/user.model')
const review = require('../models/review.model')


const checkForm = {
  checkProduct: (req, res, next) => {
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

    const newCheck = [{
        name: 'Name',
        value: name,
        type: 'string'
      },
      {
        name: 'Price',
        value: price,
        type: 'number'
      },
      {
        name: 'Category',
        value: idCategory,
        type: 'number'
      },
      {
        name: 'Stock',
        value: stock,
        type: 'number'
      },
      {
        name: 'Color',
        value: color,
        type: 'string'
      },
      {
        name: 'Size',
        value: size,
        type: 'string'
      },
      {
        name: 'Description',
        value: description,
        type: 'string'
      },
      {
        name: 'Condition Product',
        value: conditionProduct,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkCategory: (req, res, next) => {
    const {
      name
    } = req.body
    const newCheck = [{
      name: 'Name',
      value: name,
      type: 'string'
    }]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkSendInvoiceToEmail: (req, res, next) => {
    const {
      invoice,
      cashier,
      email,
      orders,
      purchaseAmount,
      initialPrice,
      priceAmount,
      amount
    } = req.body
    const newCheck = [{
        name: 'Invoice',
        value: invoice,
        type: 'string'
      },
      {
        name: 'Cashier',
        value: cashier,
        type: 'string'
      },
      {
        name: 'Orders',
        value: orders,
        type: 'string'
      },
      {
        name: 'Email',
        value: email,
        type: 'string'
      },
      {
        name: 'Amount',
        value: amount,
        type: 'number'
      },
      {
        name: 'Purchase amount',
        value: purchaseAmount,
        type: 'string'
      },
      {
        name: 'Initial price',
        value: initialPrice,
        type: 'string'
      },
      {
        name: 'Price amount',
        value: priceAmount,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkSignup: (req, res, next) => {
    const {
      name,
      email,
      phone,
      storeName,
      password,
      roleId
    } = req.body

    const newCheck = [{
        name: 'Name',
        value: name,
        type: 'string',
      },
      {
        name: 'Role',
        value: roleId,
        type: 'number',
      },
      {
        name: 'Email',
        value: email,
        type: 'string',
      },
      {
        name: 'Password',
        value: password,
        type: 'string',
      }
    ]
    if (Number(roleId) === 2) {
      newCheck.push({
        name: 'Phone Number',
        value: phone,
        type: 'number',
      }, {
        name: 'Store Name',
        value: storeName,
        type: 'string',
      })
    }

    errorHandling(res, newCheck, async () => {
      let isEmailExist
      try {
        const resEmail = await userModels.checkEmailExist(email)
        isEmailExist = resEmail[0].totalFound
      } catch (error) {
        helpers.response(res, [], error.statusCode, null, null, error)
      }
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email,
      )
      if (!checkEmail) {
        return helpers.response(res, [], 400, null, null, ['Invalid email'])
      } else if (isEmailExist > 0) {
        return helpers.response(res, [], 400, null, null, [
          'Email already exist',
        ])
      } else if (Number(roleId) !== 1 && Number(roleId) !== 2 && Number(roleId) !== 3) {
        return helpers.response(res, [], 400, null, null, ['Invalid role'])
      } else if (password.length < 6) {
        return helpers.response(res, [], 400, null, null, [
          'Password min 6 character',
        ])
      } else {
        next()

      }
    })
  },
  checkLogin: (req, res, next) => {
    const {
      email,
      password
    } = req.body
    const newCheck = [{
        name: 'Email',
        value: email,
        type: 'string',
      },
      {
        name: 'Password',
        value: password,
        type: 'string',
      },
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkUpdateProfile: (req, res, next) => {
    const {
      name,
      phone,
      gender,
      dateBirth
    } = req.body
    const newCheck = [{
        name: 'Name',
        value: name,
        type: 'string',
      },
      {
        name: 'Phone Number',
        value: phone,
        type: 'string',
      },
      {
        name: 'Gender',
        value: gender,
        type: 'string',
      },
      {
        name: 'Date Birth',
        value: dateBirth,
        type: 'string',
      }
    ]
    errorHandling(res, newCheck, async () => {
      if (gender !== 'm' && gender !== 'f') {
        return helpers.response(res, [], 400, null, null, ['Invalid gender'])
      } else {
        next()
      }
    })
  },
  checkUpdateStore: (req, res, next) => {
    const {
      storeName,
      phone,
      storeDescription
    } = req.body
    const newCheck = [{
        name: 'Store Name',
        value: storeName,
        type: 'string',
      },
      {
        name: 'Phone Number',
        value: phone,
        type: 'string',
      },
      {
        name: 'Store Description',
        value: storeDescription,
        type: 'string',
      }
    ]
    errorHandling(res, newCheck, async () => {
      next()
    })
  },
  checkUpdateUser: (req, res, next) => {
    const {
      name,
      phone,
      gender,
      dateBirth,
      StoreName,
      StoreDescription,
      statusUpdate
    } = req.body
    const newCheck = [{
      name: 'Phone Number',
      value: phone,
      type: 'string',
    }]
    if (statusUpdate === 'profile') {
      newCheck.push({
        name: 'Name',
        value: name,
        type: 'string',
      }, {
        name: 'Gender',
        value: gender,
        type: 'string',
      }, {
        name: 'Date Birth',
        value: dateBirth,
        type: 'string',
      })
    } else if (statusUpdate === 'store') {
      newCheck.push({
        name: 'Store Name',
        value: StoreName,
        type: 'string',
      }, {
        name: 'Store Description',
        value: StoreDescription,
        type: 'string',
      })
    }
    errorHandling(res, newCheck, async () => {
      if (gender !== 'm' && gender !== 'f') {
        return helpers.response(res, [], 400, null, null, ['Invalid gender'])
      } else {
        next()
      }
    })
  },
  checkChangePassword: (req, res, next) => {
    const {
      password,
      confirmPassword
    } = req.body
    const newCheck = [{
        name: 'Password',
        value: password,
        type: 'string',
      },
      {
        name: 'Confirmation Password',
        value: confirmPassword,
        type: 'string',
      }
    ]
    errorHandling(res, newCheck, async () => {
      if (password.length < 6) {
        return helpers.response(res, [], 400, null, null, [
          'New password min 6 character',
        ])
      } else if (confirmPassword.length < 6) {
        return helpers.response(res, [], 400, null, null, [
          'Confirmation password min 6 character',
        ])
      } else if (password !== confirmPassword) {
        return helpers.response(res, [], 400, null, null, [
          'New password not match with confirmation password',
        ])
      } else {
        next()
      }
    })
  },
  checkReqResetPassword: (req, res, next) => {
    const {
      email,
    } = req.body

    const newCheck = [{
      name: 'Email',
      value: email,
      type: 'string',
    }]

    errorHandling(res, newCheck, async () => {
      let isEmailExist = 0
      let emailStatus
      try {
        const resEmail = await userModels.checkEmailExist(email)
        const resStatus = await userModels.getUserByEmail(email)
        isEmailExist = resEmail[0].totalFound
        emailStatus = resStatus[0].status
        console.log(resStatus[0].status)
      } catch (error) {
        helpers.response(res, [], error.statusCode, null, null, error)
      }
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email,
      )
      if (!checkEmail) {
        return helpers.response(res, [], 400, null, null, ['Invalid email'])
      } else if (isEmailExist < 1) {
        return helpers.response(res, [], 400, null, null, [
          'Email not found',
        ])
      } else if (emailStatus === 0) {
        return helpers.response(res, [], 400, null, null, [
          'Please activate your account before resetting the password',
        ])
      } else {
        next()

      }
    })
  },
  checkInsertReview: (req, res, next) => {
    const {
      idProduct,
      idUser,
      rating,
      description
    } = req.body
    const newCheck = [{
        name: 'Product',
        value: idProduct,
        type: 'number'
      },
      {
        name: 'Rating',
        value: rating,
        type: 'number'
      },
      {
        name: 'Description',
        value: description,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, async () => {
      let isUserExist
      try {
        const response = await reviewModels.getReviewByIdProductAndIdUsr(idProduct, idUser)
        isUserExist = response.length
      } catch (error) {
        isUserExist = 0
      }
      if (isUserExist >= 1) {
        return helpers.response(res, [], 400, null, null, ['Only one product review is allowed'])
      } else if (Number(rating) > 5) {
        return helpers.response(res, [], 400, null, null, ['Rating range 1-5'])
      } else {
        next()
      }
    })
  },
  checkUpdateReview: (req, res, next) => {
    const {
      idUser,
      idProduct,
      rating,
      description
    } = req.body
    const id = req.params.id

    const newCheck = [{
        name: 'User',
        value: idUser,
        type: 'number'
      },
      {
        name: 'Product',
        value: idProduct,
        type: 'number'
      },
      {
        name: 'Rating',
        value: rating,
        type: 'number'
      },
      {
        name: 'Description',
        value: description,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, async () => {
      let dataReview
      try {
        const response = await reviewModels.getReviewById(id)
        dataReview = response[0]
      } catch (error) {
        helpers.response(res, [], error.statusCode, null, null, error)
      }
      console.log(dataReview)
      if (dataReview.idUser === Number(idUser) && dataReview.idProduct === Number(idProduct)) {
        if (Number(rating) > 5) {
          return helpers.response(res, [], 400, null, null, ['Rating range 1-5'])
        } else {
          next()
        }
      } else {
        return helpers.response(res, [], 403, null, null, ['You do not have access to edit this review'])
      }
    })
  },
  checkOrder: (req, res, next) => {
    const {
      invoice,
      idAddress,
      orders,
      purchaseAmount,
      initialPrice,
      priceAmount,
      amount,
      color,
      size,
      paymentMethod,
    } = req.body
    const newCheck = [{
        name: 'Invoice',
        value: invoice,
        type: 'string'
      },
      {
        name: 'Address',
        value: idAddress,
        type: 'number'
      },
      {
        name: 'Orders',
        value: orders,
        type: 'string'
      },
      {
        name: 'Purchase amount',
        value: purchaseAmount,
        type: 'string'
      },
      {
        name: 'Initial price',
        value: initialPrice,
        type: 'string'
      },
      {
        name: 'Price amount',
        value: priceAmount,
        type: 'string'
      },
      {
        name: 'Amount',
        value: amount,
        type: 'number'
      },
      {
        name: 'Color',
        value: color,
        type: 'string'
      },
      {
        name: 'Size',
        value: size,
        type: 'string'
      },
      {
        name: 'Payment Method',
        value: paymentMethod,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkSendInvoiceToEmail: (req, res, next) => {
    const {
      invoice,
      cashier,
      email,
      orders,
      purchaseAmount,
      initialPrice,
      priceAmount,
      amount
    } = req.body
    const newCheck = [{
        name: 'Invoice',
        value: invoice,
        type: 'string'
      },
      {
        name: 'Cashier',
        value: cashier,
        type: 'string'
      },
      {
        name: 'Orders',
        value: orders,
        type: 'string'
      },
      {
        name: 'Email',
        value: email,
        type: 'string'
      },
      {
        name: 'Amount',
        value: amount,
        type: 'number'
      },
      {
        name: 'Purchase amount',
        value: purchaseAmount,
        type: 'string'
      },
      {
        name: 'Initial price',
        value: initialPrice,
        type: 'string'
      },
      {
        name: 'Price amount',
        value: priceAmount,
        type: 'string'
      }
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },
  checkAddress: (req, res, next) => {
    const {
      home,
      receiptName,
      address,
      city,
      receiptPhone,
      postalCode
    } = req.body
    const newCheck = [{
        name: 'Home',
        value: home,
        type: 'string',
      },
      {
        name: 'Receipt Name',
        value: receiptName,
        type: 'string',
      },
      {
        name: 'Address',
        value: address,
        type: 'string',
      },
      {
        name: 'City',
        value: city,
        type: 'string',
      },
      {
        name: 'Receipt Phone',
        value: receiptPhone,
        type: 'string',
      },
      {
        name: 'Postal Code',
        value: postalCode,
        type: 'string',
      },
    ]
    errorHandling(res, newCheck, () => {
      next()
    })
  },

}

module.exports = checkForm