const Router = require('express')
const router = new Router
const adminController = require('../controllers/adminController')

router.post('/login', adminController.login)
router.patch('/promote', adminController.promote)
router.delete('/delete', adminController.delete)
router.get('/users', adminController.users)

module.exports = router