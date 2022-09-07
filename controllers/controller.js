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


exports.Home = (req, res) => {
    res.render('index')
};

exports.Game = (req, res) => {
    res.render('games')
}

exports.loginView = (req, res) => {
    res.render('login')
}


exports.RegisterView = (req, res) => {
    res.render('register')
}

// game history
exports.GameHistory = async (req, res) => {
    const { user_id, win, draw, lose } = req.body
    let historyData = {
        user_id: user_id,
        win: win,
        draw: draw,
        lose: lose,
        type_player: "Player",
        date_time: Date.now()
    }  
    
    try {
        let findDataTotalScore = await TotalScore.findOne({ user_id: user_id })
        let createGameHistory = await GameHistory.create(historyData)
        if ( !findDataTotalScore ) {
            let createTotalScore = await TotalScore.create(historyData)
            res.send({ statusCode: 200, message: 'successfull to save game score !'})
        } else {
            findDataTotalScore.win = findDataTotalScore.win + win
            findDataTotalScore.lose = findDataTotalScore.lose + lose
            findDataTotalScore.draw = findDataTotalScore.draw + draw
            console.log(findDataTotalScore)
            let updateTotalScore = await TotalScore.findOneAndUpdate(
                { user_id: user_id }, findDataTotalScore
            )
            res.send({ statusCode: 200, message: 'successfull to save game score !'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'failed to save game score!',
            statusCode: 500,
        })
    }
}
// score
exports.getScore = async (req, res) => {
    let UserId = req.params.id

    try {
        let getScore = await TotalScore.aggregate([
            { $match: { 'user_id': UserId } },
            {
                $lookup: {
                    from: 'gamehistories',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'score_history'
                }
            }
        ])
           
        console.log(getScore)
        res.render('high-score',{
            statusCode: 200,
            message: 'Successfull to get game data score!',
            results: getScore,
            nomor: 1
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message: 'Failed to get game data score!',
        })
    }
} 

exports.gameRoom = (req, res) => {
    res.render('gameroom')
}

exports.tes = async (req, res) => {
    try {     
        let data = await UserModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


