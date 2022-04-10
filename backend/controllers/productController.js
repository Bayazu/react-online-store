const Product = require("../models/product");
const uuid = require("uuid");
const path = require('path');
const fs = require("fs");

class productController{
    async listing(req, res){
        try{
            const product = await Product.find({})
            res.status(200).json(product)
        }catch (e) {
            res.status(500).json(e)
        }
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
            return res.json(savedProduct)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async modify(req, res){

    }

    async delete(req, res){
        try{
            const product = await Product.findById(req.params.id);
            const img = product.image
            fs.unlink("static/" + img , (err)=>{
                if (err){
                    console.log(err)
                } else{
                    console.log("Файл удален")
                }
            })
            await product.remove()
            res.status(200).json({data: true})
        }catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new productController()