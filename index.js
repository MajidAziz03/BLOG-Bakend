const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');


const authRoutes = require('./routes/authRoutes')

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Databse is Connected")
}).catch((error) => {
    console.log("error in database", error.message)
})

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is listening at" + port)
})
