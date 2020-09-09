const helpers = require('../helpers/helpers')
const errorHandling = require('../helpers/errorHandling')
const userModels = require('../models/user.model')


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
    if (roleId === '1') {
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
      } else if (roleId !== '1' && roleId !== '2' && roleId !== '3') {
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
      oldPassword,
      newPassword,
      verifyNewPassword
    } = req.body
    const newCheck = [{
        name: 'Old password',
        value: oldPassword,
        type: 'string',
      },
      {
        name: 'New password',
        value: newPassword,
        type: 'string',
      },
      {
        name: 'Verify new password',
        value: verifyNewPassword,
        type: 'string',
      },
    ]
    errorHandling(res, newCheck, async () => {
      if (newPassword.length < 6) {
        return helpers.response(res, [], 400, null, null, [
          'New password min 6 character',
        ])
      } else if (verifyNewPassword.length < 6) {
        return helpers.response(res, [], 400, null, null, [
          'Verification new password min 6 character',
        ])
      } else if (newPassword !== verifyNewPassword) {
        return helpers.response(res, [], 400, null, null, [
          'New password not match with verification',
        ])
      } else {
        next()
      }
    })
  }

}

module.exports = checkForm