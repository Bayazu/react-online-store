const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload")
const router = require('./routes/index')
const path = require('path')

const app = express();
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
dotenv.config();

const PORT = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})