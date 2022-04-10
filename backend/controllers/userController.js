const User = require('../models/client');
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
            if (candidate){
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
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
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.role, user.username, user.email)
            return res.json({token})
        }catch (e) {
            res.status(500).json(e)
        }
    }
    //TODO доделать изменение
    async modify(req, res){

    }
    //TODO доделать удаление
    async delete(req, res){

    }

    async profile(req, res){
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "Вы не авторизованы"})
            }
            const decodedInfo = jwt.verify(token, secret)
            const emailValidation = await User.findOne({email: decodedInfo.email})
            if(!emailValidation){
                return res.status(400).json({message: "Не удалось найти такого пользователя"})
            }
            res.status(200).json(emailValidation)
        }catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new userController()