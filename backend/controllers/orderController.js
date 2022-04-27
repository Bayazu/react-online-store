const Order = require("../models/order")
const User = require("../models/client")
const Product = require("../models/product")
const jwt = require("jsonwebtoken")
const {secret} = require("../config")
const {add} = require("nodemon/lib/rules");

class orderController{
    async buy(req,res){

    }

    async orderCreate(req,res){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedUsername = jwt.verify(token, secret)
            const user = await User.findOne({username: decodedUsername.username})
            const address = {
                country: user.country,
                city: user.city,
                street: user.street,
                building: user.building,
                apartment: user.apartment
            }
            const clientInfo = {
                username: user.username,
                firstName: user.firstName,
                secondName: user.secondName,
                email: user.email
            }
            const products = req.body

            const allPrices = await Promise.all(products.map(async el => {
                const nameProd =  await Product.findOne({_id: el._id})
                return nameProd.price * el.amount
            }));
            const resultPrice = allPrices.reduce((sum,el) =>{
                return sum + el;
            }, 0);
            const allProducts = await Promise.all(products.map(async el => {
                return await Product.findOne({_id: el._id})
            }));
            const order = new Order({clientId: user._id, clientInfo: clientInfo, clientAddress: address, products: allProducts , priceOrder: resultPrice})
            await order.save()
            res.status(200).json(order)
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async orders(req,res){

    }

}

module.exports = new orderController()