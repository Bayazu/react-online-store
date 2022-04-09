const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    Username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "ADMIN"
    }
})

module.exports = mongoose.model("products", clientSchema)