const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    username: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true
    }
})

const UserDatabase = Mongoose.model('UserDatabase', Schema)
module.exports = UserDatabase