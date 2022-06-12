const Router = require('express')
const router = new Router
const orderController = require('../controllers/orderController')

router.post('/orderCreate', orderController.orderCreate)
router.get('/orderById/:id', orderController.orderById)

module.exports = router