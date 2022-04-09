const Product = require("../models/product");
const uuid = require("uuid");
const path = require('path');

class productController{
    async listing(req, res){

    }

    async product(req, res){

    }

    async new(req, res) {
        try {
            const {name, description, price, amount} = req.body
            const {image} = req.files
            const fileName = uuid.v4() + ".jpg"
            await image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = new Product({name, description, price, amount, image: fileName})
            const savedProduct = await product.save()
            console.log(savedProduct)
            return res.json(savedProduct)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async modify(req, res){

    }

    async delete(req, res){

    }
}

module.exports = new productController()