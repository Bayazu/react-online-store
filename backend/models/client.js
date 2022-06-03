const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
    dateRegistration: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("client", clientSchema)