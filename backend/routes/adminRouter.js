const Router = require('express')
const router = new Router
const adminController = require('../controllers/adminController')

router.post('/login', adminController.login)
router.post('/addAdmin', adminController.addAdmin)
router.patch('/userModify/:id', adminController.userModify)
router.delete('/delete/:id', adminController.delete)
router.get('/userId/:id', adminController.userId)
router.get('/users', adminController.users)
router.get('/orders', adminController.orderList)
router.get('/ordersMonth', adminController.ordersMonths)
router.get('/usersWeek', adminController.usersWeek)
router.get('/summMonth', adminController.ordersSummMonths)

module.exports = router