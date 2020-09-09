const bcrypt = require('bcrypt')
const saltRounds = 12
const helpers = require('../helpers/helpers')
const userModels = require('../models/user.model')
const tokenModels = require('../models/token.model')
var jwt = require('jsonwebtoken')

let tokenList = {}
const auth = {
  signup: async (req, res) => {
    const {
      name,
      email,
      phone,
      storeName,
      password,
      roleId
    } = req.body

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const newUser = {
          name,
          email,
          password: hash,
          roleId,
          status: 0,
        }
        if (roleId === '1') {
          newUser.phone = phone
          newUser.storeName = storeName
        }
        userModels
          .signup(newUser)
          .then((response) => {
            // Token for verify email
            const token = jwt.sign({
                data: response.insertId,
              },
              process.env.PRIVATE_KEY, {
                expiresIn: '3h',
              },
            )

            helpers.redisInstance().del('getAllUsers')

            const mailinfo = {
              from: 'joonacode@gmail.com',
              to: email,
              subject: 'Activate Account Toko Fuku',
              html: `<p>
                    Click this link to <strong>activate</strong> your account: <a href="${process.env.BASE_URL_FRONTEND}/verify-account?token=${token}" target="_blank">Activate</a>
                  </p>
                  <small>link expires in 3 hours</small>`,
            }
            helpers.transporter(mailinfo, () => {
              userModels
                .getUserById(response.insertId)
                .then((responseUser) => {
                  tokenModels
                    .sendToken({
                      token,
                      idUser: response.insertId
                    })
                    .then((resToken) => console.log(`Token send to ${email}`))
                  const resultUser = responseUser[0]
                  delete resultUser.password
                  helpers.response(
                    res,
                    resultUser,
                    res.statusCode,
                    helpers.status.insert,
                    null,
                  )
                })
                .catch((err) => {
                  helpers.response(res, [], err.statusCode, null, null, err)
                })
            })

          })
          .catch((error) => {
            helpers.response(res, [], 400, null, null, error)
          })
      })
    })
  },
  login: (req, res) => {
    const {
      email,
      password
    } = req.body
    userModels
      .login(email)
      .then((response) => {
        const user = response[0]
        if (user.status === 0) return helpers.response(res, [], 404, null, null, ['Your account has not been activated, please check your email to activate', ])
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            helpers.redisInstance().del('getDetailUser')
            const newResponse = {
              id: user.id,
              roleId: user.roleId,
            }
            var token = jwt.sign({
                data: newResponse,
              },
              process.env.PRIVATE_KEY, {
                expiresIn: '5h',
              },
            )
            newResponse.token = token
            helpers.redisInstance().del('getAllUsers')
            helpers.response(
              res,
              newResponse,
              res.statusCode,
              'Login success',
              null,
            )
          } else {
            helpers.response(res, [], 404, null, null, [
              'Wrong email or password',
            ])
          }
        })
      })
      .catch((error) => {
        helpers.response(res, [], error.statusCode, null, null, [
          'Wrong email or password',
        ])
      })
  },

  verifyAccount: (req, res) => {
    const token = req.body.token
    if (!token) return helpers.response(res, [], 400, null, null, 'No token provided')
    tokenModels.findToken(token).then(response => {
      const {
        token,
        idUser
      } = response[0]
      jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
        if (err) {
          if (err.name === 'JsonWebTokenError') {
            return helpers.response(res, [], 401, null, null, 'Token invalid')
          } else if (err.name === 'TokenExpiredError') {
            tokenModels.deleteToken(token).then(deleteResponse => console.log('token deleted'))
            userModels.deleteUser(idUser).then(deleteUsrResponse => console.log('usr deleted'))
            return helpers.response(res, [], 401, null, null, 'Token expired, please register again')
          } else {
            return helpers.response(res, [], 401, null, null, err)
          }
        } else {
          tokenModels.activateAccount(decoded.data).then(responseActivate => {
            helpers.response(
              res,
              responseActivate,
              res.statusCode,
              'Account successfully activate',
              null,
            )
            tokenModels.deleteToken(token).then(deleteResponse => console.log('token deleted'))
          })
        }
      })
    }).catch(err => {
      helpers.response(res, [], 400, null, null, 'Token invalid')
    })
  }
}

module.exports = auth