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

    async current(req, res){
        try{
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }catch (e) {
            res.status(500).json(e)
        }
    }

    async new(req, res) {
        try {
            const {name, description, price, amount, tag} = req.body
            const {image} = req.files
            const fileName = uuid.v4() + ".jpg"
            await image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = new Product({name, description, price, amount, tag, image: fileName})
            const savedProduct = await product.save()
            return res.json(savedProduct)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async modify(req, res){
        try{
            const product = await Product.findById(req.params.id)
            if(typeof req.body.image == "string"){
                delete req.body.image
            }
            if(req.files){
                const {image} = req.files
                fs.unlink("static/" + product.image, (err)=>{
                    if (err){
                        console.log(err)
                    } else{
                        image.mv(path.resolve(__dirname,'..', 'static', product.image))
                    }
                })
            }
            Object.assign(product, req.body)
            product.save()
            res.status(200).json(product)
        }catch (e) {
            res.status(500).json(e)
        }
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

    async listingWithTag(req,res){
        try{
            const tags = req.query.tag;
            const products = await Product.find({"tag": tags})
            res.status(200).json(products)
        }catch (e) {
            res.status(500).json(e)
        }
    }
    async findProduct(req,res){
        try {
            const {name} = req.body
            const order = await Product.find({name :{$regex: new RegExp('.*' + name, 'i')}})
            res.status(200).json(order)
        }catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new productController()