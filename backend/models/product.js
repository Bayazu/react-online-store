const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: null
    },
    priceInTotal:{
        type: Number,
        default: null
    },
    image: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("products", productSchema)