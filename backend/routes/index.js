const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter) //Авторизация регистрация - заполнение данных, измененеие данных, просмотр своих данных, удаление аккаунта
router.use('/admin', adminRouter) //Авторизация, смена ролей юзеров, получение всех клиентов, удаление аккаунтов пользователей.
router.use('/product', productRouter) //просмотр товаров, !!админ удаление добавление редактирование товаров
router.use('/order', orderRouter)//Покупка товара !!админ получение всех заказов

module.exports = router