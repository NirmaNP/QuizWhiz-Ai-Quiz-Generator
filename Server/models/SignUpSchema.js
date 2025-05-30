const mongoose = require('mongoose')

const SignUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "Passionate learner who enjoys challenging quizzes"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatarImageURL: {
        type: String,
        default: ""
    },
})

const SignUpModel = mongoose.model("UserDetails", SignUpSchema)
module.exports = SignUpModel