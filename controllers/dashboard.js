const axios = require('axios')
const Cryptr = require('cryptr');
const SecretKey = process.env.SecretKey
const CryptrConverter = new Cryptr(SecretKey);
const JWT = require('jsonwebtoken')
const auth = require('../middlewares/auth')

// models
const UserModel = require('../models/mongoDB/schema/user-schema')
const UserProfile = require('../models/mongoDB/schema/userProfile')
const GameHistory = require('../models/mongoDB/schema/historyschema');
const TotalScore = require('../models/mongoDB/schema/totalscoreSchema');





// user admin
exports.superView1 = async (req, res) => {
    const cookie = req.cookies
    try {
        if (cookie.user === undefined) {
            res.redirect('/404')
        } else {   
            const token = JSON.parse(cookie.user)
            console.log(token.token)
            const config = {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + token.token
                        }
                      }
            let response = await axios('http://localhost:8000/super-user/api', config)
            console.log(response.data.message)
            if (response.data.message === 'gagal') {
                res.redirect('/404')
            } else {  
                res.render('super-user', response.data)
            }
        }
    } catch (error) {
        console.log(error)
    }

}

exports.dataUser = async (req, res) => {
    const cookie = req.cookies
    try {
        if (cookie.user === undefined) {
            res.redirect('/404')
        } else {   
            const token = JSON.parse(cookie.user)
            console.log(token.token)
            const config = {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + token.token
                        }
                      }
            let response = await axios('http://localhost:8000/super-user/api', config)
            console.log(response.data.message)
            if (response.data.message === 'gagal') {
                res.redirect('/404')
            } else {  
                res.render('users',response.data)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.detailUser = async (req, res) => {
    const cookie = req.cookies
    const id = req.params.id
    try {
        if (cookie.user === undefined) {
            res.redirect('/404')
        } else {   
            const token = JSON.parse(cookie.user)
            console.log(token.token)
            const config = {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + token.token
                        }
                      }
            let resp = await axios(`http://localhost:8000/super-user/api/${id}`, config)
            console.log(resp.data)
            if (resp.data.message === 'gagal') {
                res.redirect('/404')
            } else {  
                res.render('detail-user',resp.data)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.superView = async (req, res) => {
    
    try {
        let userList = await UserModel.find()
        let userProfiledet = await UserProfile.find()
        console.log(userList)
        return res.status(200).json({
            statusCode: 200,
            message: 'succesfull get data',
            result: userList,
            profile: userProfiledet,
            nomor: 1
        })
        
    } catch (error) {
        res.status(400).json({
            statusCode:500,
            message: 'gagal'
        })
    }
    
}

exports.userProfileApi = async (req, res)=>{
    const id = req.params.id
    try {
        let userProfile = await UserProfile.findOne({ user_id: id })
        res.json({
            message: "succes",
            result: userProfile
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "gagal"
        })
    }
}

exports.userUpdate = async (req, res) => {
    let { user_id, first_name, last_name, umur, tgl_lahir, gender, address } = req.body
    let data = {
        first_name: first_name,
        last_name: last_name,
        umur: umur,
        tgl_lahir: tgl_lahir,
        gender: gender,
        address: address
    }
    console.log(data)
    try {
        let updateProfile = await UserProfile.findOneAndUpdate({ user_id: user_id }, data)
        let getProfile = await UserProfile.findOne({ user_id: user_id })
        res.json({
            statusCode:200,
            message: "succesfull update data"
        })      
        console.log(getProfile)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message:'gagal'
        })
    }
}

exports.deleteUser = async (req, res) => {
    const id_user = req.params.id
    console.log(id_user)
    try {
        let deleteUserProfile = await UserProfile.findOneAndRemove({ user_id: id_user })
        let deleteUser = await UserModel.findOneAndRemove({ _id: id_user })
        res.json({
            statusCode: 200,
            message: "berhasil di delete"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message:'gagal'
        })
    }
}

//profile user
exports.profileUser = async (req, res) => {
    const id_user = req.params.id
    try {
        let userProfile = await UserProfile.findOne({ user_id: id_user })
        
        res.status(200).render('profile-user',{
            statusCode: 200,
            message: 'succesfull to get data',
            result: userProfile
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message:'gagal'
        })
    }
}

exports.updateProfile = async (req, res) => {
    const id = req.params.id
    let { first_name, last_name,  umur, tgl_lahir, gender, address } = req.body
    let data =  {
        first_name: first_name,
        last_name: last_name,
        umur: umur,
        tgl_lahir: tgl_lahir,
        gender: gender,
        address: address
    }
    try {
        let updateProfile = await UserProfile.findOneAndUpdate({ user_id: id }, data)
        let getProfile = await UserProfile.findOne({ user_id: id })
        
        res.redirect('/user-profile/' + id)
        
            
        console.log(req.body)
        console.log(id)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message:'gagal'
        })
    }
}