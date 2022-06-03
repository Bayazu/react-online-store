const Admin = require("../models/admin");
const User = require("../models/client")
const Order = require("../models/order")
const bcrypt = require("bcryptjs");
const {secret} = require("../config")
const jwt = require("jsonwebtoken")
const moment = require("moment");

const generateAdminToken = (id, roles, username, ) => {
    const payload = {
        id,
        roles,
        username,
    }
    return jwt.sign(payload, secret, {expiresIn: "31d"})
}

class adminController{
    async login(req, res){
        try {
                const {username, password} = req.body
                const admin = await Admin.findOne({username})
                if(!admin){
                    return res.status(400).json({message: "Администратор не найден!"})
                }
                const validPassword = bcrypt.compareSync(password, admin.password)
                if (!validPassword){
                    return res.status(400).json({message: "Введен неверный пароль"})
                }
                const token = generateAdminToken(admin._id, admin.role, admin.username)
                const role = admin.role
                return res.json({token, role})
            }catch (e) {
                res.status(500).json(e)
        }
    }

    async addAdmin(req, res){
        try{
            const {username,password} = req.body
            const admins = await Admin.findOne({username})
            if (admins){
                return res.status(400).json({message: "Администратор с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const admin = new Admin({username,password: hashPassword,})
            admin.save()
            return res.status(200).json({message: "Администратор успешно зарегестрирован"})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res){
        try{
            const user = await User.findById(req.params.id, {password: 0})
            await user.remove()
            res.status(200).json({message: "Пользователь удален"})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async users(req, res){
        try {
            const users = await User.find({}, {password: 0})
            res.status(200).json(users)
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async userModify(req, res){
        try{
            const user = await User.findById(req.params.id)
            const userChange = req.body
            if(await userChange.password){
                userChange.password = bcrypt.hashSync(userChange.password, 7)
            }
            Object.assign(user, userChange)
            user.save()
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async userId(req,res){
        try{
            const user = await User.findById(req.params.id, {password: 0})
            res.status(200).json(user)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async orderList(req,res){
        try {
            const orders = await Order.find({})
            res.status(200).json(orders)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async ordersMonths(req,res){
        try {
            const orders = await Order.find({})
            const currentMonth = moment().format('M');
            const filtered = await orders.filter((el) => {
                if(currentMonth === moment(el.datePurchase).format('M')){
                    return el
                }
            })
            res.status(200).json(filtered)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async usersWeek(req,res){
        try {
            const users = await User.find({})
            const start = +moment().startOf('isoWeek').valueOf()
            const end = +moment().endOf('isoWeek').valueOf()
            const filtered = await users.filter((el) => {
                const currentDate = el.dateRegistration.valueOf()
                if(start < currentDate){
                    if(end > currentDate){
                        return el
                    }
                }
            })
            res.status(200).json(filtered)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async ordersSummMonths(req,res){
        try {
            const orders = await Order.find({})
            const currentMonth = moment().format('M');
            const filtered = await orders.reduce((sum, el) => {
                if(currentMonth === moment(el.datePurchase).format('M')){
                    return sum + el.priceOrder
                }else{
                    return null
                }
            }, 0)
            res.status(200).json(filtered)
        }catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new adminController()