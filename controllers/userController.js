const axios = require('axios')
const Cryptr = require('cryptr');
const SecretKey = process.env.SecretKey
const CryptrConverter = new Cryptr(SecretKey);
const JWT = require('jsonwebtoken')
const auth = require('../middlewares/auth')

// models
const UserModel = require('../models/mongoDB/schema/user-schema')
const UserProfile = require('../models/mongoDB/schema/userProfile')

// login
exports.login = async (req, res,next) => {
    const { username, password } = req.body
    if ( !username || !password) {
        res.status(400).send({ message: "Wrong username or password1", statusCode: 400 })
    } else {
        try {
            // Check User Exist
            let findUser = await UserModel.findOne({ username: username })
            console.log(findUser)
            if (!findUser ) {
                res.status(400).send({ message: "Wrong username or password2", statusCode: 400 })
            } else {
                // Check Password
                if ( CryptrConverter.decrypt(findUser.password) == password ) {
                    // Create Token Access
                    let createToken = JWT.sign({
                        id: findUser._id,
                        username: findUser.username,
                        email: findUser.email,
                        role: findUser.role
                    }, SecretKey)

                    // Get Data Profile
                    let getProfile = await UserProfile.findOne({ user_id: findUser._id })
                    res.json({
                        message: 'Successfull to login / get data user',
                        statusCode: 200,
                        result: {
                            id: findUser._id,
                            username: findUser.username,
                            email: findUser.email,
                            role: findUser.role,
                            token: createToken,
                            // profile: getProfile
                        }
                    })
                   return  next()
                } else {
                    res.status(400).send({ message: "Wrong username or password", statusCode: 400 })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    }
};


// register
exports.Register = async (req, res, next) => {
    const { username, password, email, role } = req.body
    if (!username || !password || !email || !role) {
        res.status(400).send({ message: "Wrong username or password", statusCode: 400 })
    } else {
        try {
            // Check User if exist
            let findUser = await UserModel.findOne({ username: username, email: email })
            if (findUser) {
                return res.status(400).json({
                    message: "Username or Email has registered. Please use the other!",
                    statusCode: 400,
                })
            } else {
                let newPasswordPassing = CryptrConverter.encrypt(password)
                // Send New Data
                let createUser = await UserModel.create({
                    username: username, password: newPasswordPassing,
                    email: email,
                    role: role
                })
                
                let createProfile = await UserProfile.create({
                    user_id: createUser._id, first_name: "",
                    last_name: "", full_name: "", umur: 0,
                    tgl_lahir: "", gender: "", address: "",
                })

                // Send Verifikasi
               return res.status(200).json({
                    statusCode: 200,
                    message: 'Successfull to register data!'
               })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Username or Email has registered. Please use the othere!",
                statusCode: 400,
            })
        }
    }
};

