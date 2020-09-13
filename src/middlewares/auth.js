const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return helpers.response(res, [], 403, null, null, 'No token provided')
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helpers.response(res, [], 401, null, null, 'Token invalid')
      } else if (err.name === 'TokenExpiredError') {
        return helpers.response(res, [], 401, null, null, 'Token expired')
      } else {
        return helpers.response(res, [], 401, null, null, err)
      }
    }
    req.userId = decoded.data.id
    req.roleId = decoded.data.roleId
    next()
  })
}

const isAdmin = (req, res, next) => {
  if (req.roleId === 1) {
    next()
    return
  }
  return helpers.response(res, [], 403, null, null, 'Only admin can access')
}

const isCostumer = (req, res, next) => {
  if (req.roleId === 3) {
    next()
    return
  }
  return helpers.response(res, [], 403, null, null, 'Only costumer can access')
}

const isAdminOrSeller = (req, res, next) => {
  if (req.roleId === 2 || req.roleId === 1) {
    next()
    return
  }
  return helpers.response(res, [], 403, null, null, 'Only seller and admin can access')
}

const isAdminOrCostumer = (req, res, next) => {
  if (req.roleId === 3 || req.roleId === 1) {
    next()
    return
  }
  return helpers.response(res, [], 403, null, null, 'Only customer and admin can access')
}

const isASC = (req, res, next) => {
  if (req.roleId === 3 || req.roleId === 2 || req.roleId === 1) {
    next()
    return
  }
  return helpers.response(res, [], 403, null, null, 'Only seller, admin, and costumer can access')
}

const auth = {
  verifyToken,
  isAdmin,
  isAdminOrSeller,
  isASC,
  isCostumer,
  isAdminOrCostumer
}

module.exports = auth