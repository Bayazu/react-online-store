const User = require('../models/client');
const Admin = require('../models/admin')
const Order = require('../models/order')
const bcrypt = require('bcryptjs');
const {secret} = require("../config")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

const generateAccessToken = (id, roles, username, email) => {
    const payload = {
        id,
        roles,
        username,
        email
    }
    return jwt.sign(payload, secret, {expiresIn: "31d"})
}
class userController{

    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, firstName, secondName, email, password, country, city, street, building, apartment} = req.body

            const candidate = await User.findOne({username})
            const candidateMail = await User.findOne({email})
            if (candidate || candidateMail){
                return res.status(400).json({message: "Пользователь с таким именем или почтой уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, firstName, secondName, email, password: hashPassword, country, city, street, building, apartment})
            user.save()
            return res.status(200).json({message: "Пользователь успешно зарегестрирован"})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.role, user.username, user.email)
            const role = user.role
            res.json({token, role})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async modify(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "Вы не авторизованы"})
            }
            const decodedEmail = jwt.verify(token, secret)
            const emailFind = await User.findOne({email: decodedEmail.email})
            const userChange = req.body
            if(await userChange.password){
                userChange.password = bcrypt.hashSync(userChange.password, 7)
            }
            Object.assign(emailFind, userChange)
            emailFind.save()
            res.status(200).json(emailFind)
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "Вы не авторизованы"})
            }
            const decodedEmail = jwt.verify(token, secret)
            const emailValidation = await User.findOne({email: decodedEmail.email})
            await emailValidation.remove()
            res.status(200).json({message: "Пользователь был удален"})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async profile(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "Вы не авторизованы"})
            }
            const decodedInfo = jwt.verify(token, secret)
            const emailValidation = await User.findOne({email: decodedInfo.email})
            const usernameValidation = await Admin.findOne({username: decodedInfo.username})
            if(!emailValidation && !usernameValidation){
                return res.status(400).json({message: "Не удалось найти такого пользователя"})
            }
            res.status(200).json({emailValidation, usernameValidation})
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async userOrders(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "Вы не авторизованы"})
            }
            const decodedInfo = jwt.verify(token, secret)
            const orders = await Order.find({clientId: decodedInfo.id})
            res.status(200).json(orders)
        }catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new userController()