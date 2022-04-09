const Router = require('express')
const router = new Router
const orderController = require('../controllers/orderController')

router.post('/buy', orderController.buy)
router.get('/orders', orderController.orders)

module.exports = router