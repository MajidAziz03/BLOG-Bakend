const express = require('express')
const router = express.Router()
const Auth = require('../models/authModel')
const bcrypt = require('bcrypt')


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 12)
        const newUser = new Auth({
            username,
            email,
            password: hashed
        })
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(401).json(error.mesage)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userExists = await Auth.findOne({ email: req.body.email })
        !userExists && res.status(400).json("User Not Exists")
        const pass = await bcrypt.compare(req.body.password, userExists.password)
        if (!pass) {
            res.status(401).json("Incorrect email or Password")
        }
        const { password, ...others } = userExists._doc;
        res.status(201).json(others)
    } catch (error) {
        res.status(401).json(error.mesage)
    }
})




module.exports = router;