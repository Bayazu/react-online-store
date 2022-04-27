const Router = require('express')
const router = new Router
const orderController = require('../controllers/orderController')

router.post('/buy', orderController.buy)
router.post('/orderCreate', orderController.orderCreate)
router.get('/orders', orderController.orders)

module.exports = router