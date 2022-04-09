const Router = require('express')
const router = new Router
const userController = require("../controllers/userController")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.patch('/modify', userController.modify)
router.delete('/delete', userController.delete)
router.get('/profile', userController.profile)

module.exports = router