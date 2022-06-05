const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    clientId:{
        type: String,
        unique: false,
        required: true,
    },
    clientInfo: {
        type: Schema.Types.Mixed
    },
    clientAddress:{
        type: Schema.Types.Mixed,
    },
    products: {
        type: Schema.Types.Array,
    },
    amountInOrder:{
        type: Number,
        required: true
    },
    priceOrder: {
        type: Number,
        unique: false,
        required: true,
    },
    datePurchase: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        unique: false,
        default: "Created"
    }
})

module.exports = mongoose.model("orders", orderSchema)