const mongoose = require('mongoose')


const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "",
    },

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Auth", AuthSchema)