// const { json } = require('express');
const axios = require('axios');
const { json } = require('express');
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  let TokenAuth = token.split(" ")
  try {
    if ( TokenAuth[0].toLowerCase() !== 'bearer' ) {
      res.status(400).send({ message: 'Invalid Token Type' })
  } else {
      jwt.verify(TokenAuth[1], process.env.SecretKey, async function( err, resultToken ) {
        if (err) res.status(401).send({ message: 'Unauthorized !' })
        // console.log(resultToken)
        if (resultToken.role === 'admin') {
          return next()
        } else {
          res.json({
            message: "gagal"
          })
        }
      })
  }
  } catch (error) {
    console.log(error)
  }

   
};

const loginAuth = (req, res, next) => {
  const cookie = req.cookies
  console.log(cookie.user)
  if (cookie.user === undefined || cookie.user === null || cookie.user === '') {
    return next()
  } else {
    let data = JSON.parse(cookie.user)
    if (data.role === 'admin') {
      res.redirect('/super-user')
    } else {
      res.redirect('/')
    }
  }
}

const registerNext = (req, res, next) => {
  res.redirect('/login')
}
    
module.exports = { verifyToken, loginAuth, registerNext }