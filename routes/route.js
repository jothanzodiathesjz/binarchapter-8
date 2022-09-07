const { Router } = require('express')
const express = require('express')
const Routes = express.Router()
const controller = require('../controllers/controller')
const userController = require('../controllers/userController')
const dashboard = require('../controllers/dashboard')
const auth = require('../middlewares/auth')



Routes.get('/', controller.Home)
Routes.get('/games', controller.Game)
Routes.get('/datauser',controller.tes)

// login
Routes.get('/login',auth.loginAuth, controller.loginView)
Routes.post('/login', userController.login)


// register
Routes.post('/register', userController.Register)
Routes.get('/register', controller.RegisterView)


// games Score 
Routes.post('/games',controller.GameHistory)
Routes.get('/games/score/:id', controller.getScore)
Routes.get('/404', (req, res) => {
     res.render('404')
})


// dashboard
Routes.get('/super-user',dashboard.superView1)
Routes.get('/super-user/datauser', dashboard.dataUser)

Routes.get('/datauser/:id',dashboard.detailUser)


// dashboardApi
Routes.get('/super-user/api',auth.verifyToken, dashboard.superView)
Routes.get('/super-user/api/:id', auth.verifyToken, dashboard.userProfileApi)

Routes.post('/super-user/updateuser',auth.verifyToken, dashboard.userUpdate)
Routes.delete('/super-user/delete/:id',auth.verifyToken, dashboard.deleteUser)
Routes.get('/user-profile/:id', dashboard.profileUser)
Routes.post('/user-profile/:id', dashboard.updateProfile)

Routes.get('/game-room',controller.gameRoom)



module.exports = Routes

