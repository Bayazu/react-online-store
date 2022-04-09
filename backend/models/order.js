const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    firstName: {
        type: String,
        unique: false,
        required: true,
    },
    idStuffs: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    price: {
        type: Number,
        unique: false,
        required: true,
    },
    datePurchase: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("orders", orderSchema)