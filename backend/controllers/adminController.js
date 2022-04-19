const Admin = require("../models/admin");
const User = require("../models/client")
const bcrypt = require("bcryptjs");
const {secret} = require("../config")
const jwt = require("jsonwebtoken")

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
            const user = await User.findById(req.params.id)
            await user.remove()
            res.status(200).json({message: "Пользователь удален"})
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async users(req, res){
        try {
            const users = await User.find({})
            res.status(200).json(users)
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async userModify(req, res){
        try{
            const user = await User.findById(req.params.id)
            Object.assign(user, req.body)
            user.save()
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new adminController()