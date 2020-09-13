const orderModels = require('../models/order.model')
const helpers = require('../helpers/helpers')

const history = {
  getAllOrder: (req, res) => {
    const order = req.query.order
    orderModels.getAllOrder(order)
      .then(response => {
        const resultHistory = response
        helpers.redisInstance().setex('getAllHistories', 60 * 60 * 12, JSON.stringify(resultHistory))
        helpers.response(res, resultHistory, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getMyOrder: (req, res) => {
    const order = req.query.order
    const id = req.userId

    console.log(id)
    orderModels.getMyOrder(order, id)
      .then(response => {
        const resultHistory = response
        helpers.response(res, resultHistory, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  getByStatus: (req, res) => {
    const status = req.params.status
    const id = req.userId

    console.log(id)
    orderModels.getByStatus(status, id)
      .then(response => {
        const resultHistory = response
        helpers.response(res, resultHistory, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  insertOrder: (req, res) => {
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
      paymentMethod
    } = req.body

    const newOrder = {
      invoice,
      idUser: req.userId,
      idAddress,
      orders,
      color,
      size,
      purchaseAmount,
      initialPrice,
      priceAmount,
      amount,
      paymentMethod,
      status: 1
    }
    console.log(req.userId)
    orderModels.insertOrder(newOrder)
      .then(response => {
        const resultHistory = response
        helpers.response(res, resultHistory, res.statusCode, helpers.status.insert, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err.errno === 1452 ? ['Address or user not found'] : err)
      })
  },
  updateStatusOrder: (req, res) => {
    const {
      status
    } = req.body
    console.log(status)
    const numStatus = Number(status)
    if (numStatus !== 0 && numStatus !== 1 && numStatus !== 2 && numStatus !== 3 && numStatus !== 4) return helpers.response(res, [], 400, null, null, ['Wrong status'])
    const id = req.params.id
    orderModels.updateOrder({
        status
      }, id)
      .then(response => {
        helpers.response(res, response, res.statusCode, helpers.status.update, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err.errno === 1452 ? ['Cashier not found'] : err)
      })
  },
  deleteOrder: (req, res) => {
    const id = req.params.id

    orderModels.getOrderById(id).then(response => {
      const order = response[0]
      if (req.roleId === 1) {
        orderModels.deleteOrder(id)
          .then(response => {
            const resultHistory = response
            helpers.response(res, resultHistory, res.statusCode, helpers.status.delete, null)
          }).catch(err => {
            helpers.response(res, [], err.statusCode, null, null, err)
          })
      } else {
        if (order.idUser !== req.userId) {
          helpers.response(res, [], 403, null, null, ['You don\'t have access to delete this order'])
        } else if (order.status === 1 || order.status === 2) {
          helpers.response(res, [], 400, null, null, ['Orders that have been processed or sent cannot be deleted'])
        } else {
          orderModels.deleteOrder(id)
            .then(response => {
              const resultHistory = response
              helpers.response(res, resultHistory, res.statusCode, helpers.status.delete, null)
            }).catch(err => {
              helpers.response(res, [], err.statusCode, null, null, err)
            })
        }
      }
    }).catch(err => {
      helpers.response(res, [], err.statusCode, null, null, err)
    })
  },
  getOrderById: (req, res) => {
    const id = req.params.id
    orderModels.getOrderById(id)
      .then(response => {
        const resultHistory = response
        helpers.response(res, resultHistory, res.statusCode, helpers.status.found, null)
      }).catch(err => {
        helpers.response(res, [], err.statusCode, null, null, err)
      })
  },
  sendEmailMember: (req, res) => {
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

    const arrOrders = orders.split(', ')
    const arrpurchaseAmount = purchaseAmount.split(', ')
    const arrInitialPrice = initialPrice.split(', ')
    const arrPriceAmount = priceAmount.split(', ')
    const newObjOrders = []
    arrOrders.map((order, i) => {
      newObjOrders.push({
        name: order,
        purchaseAmount: arrpurchaseAmount[i],
        initialPrice: arrInitialPrice[i],
        priceAmount: arrPriceAmount[i]
      })
    })
    const emailinfo = {
      from: 'joonacode@gmail.com',
      to: email,
      subject: `Receipt Sip POS #${invoice}`,
      html: `
        <p><strong>Invoice</strong>: #${invoice}</p>
        <p><strong>Cashier</strong>: ${cashier}</p>
        <p><strong>Detail Orders</strong>:</p>
        <table>
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Initial Price</th>
            <th>Qty</th>
            <th>Total Price</th>
          </thead>
          <tbody>
          ${newObjOrders.map((order, i) => 
            `<tr v-for="(detailOrder, i) in row.item.detailOrders" :key="i">
              <td>${i + 1}</td>
              <td>${order.name}</td>
              <td>Rp. ${helpers.formatNumber(order.initialPrice)}</td>
              <td>${order.purchaseAmount}</td>
              <td>Rp. ${helpers.formatNumber(order.priceAmount)}</td>
            </tr>`
          ).join('')}
            <tr>
              <td colspan="4">Total Payment</td>
              <td>Rp. ${helpers.formatNumber(amount)}</td>
            </tr>
          </tbody>
        </table>
        `,
    }
    helpers.transporter(emailinfo, () => {
      helpers.response(
        res,
        ['Transacation success'],
        200,
        'Email successfully send',
        null,
      )
    })

  },
}

module.exports = history