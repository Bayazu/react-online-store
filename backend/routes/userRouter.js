const Router = require('express')
const router = new Router
const userController = require("../controllers/userController")
const {check} = require('express-validator')

router.post('/registration',
    [check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({
            min: 4,
            max: 10
        }),], userController.registration)
router.post('/login', userController.login)
router.patch('/modify', userController.modify)
router.delete('/delete', userController.delete)
router.get('/profile', userController.profile)

module.exports = router