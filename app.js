const express = require('express')
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')


app.use(cors())
dotenv.config()
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/public', express.static('public'))
app.set('view engine', 'ejs')
app.use(cookieParser());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
// app.use(session({
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(flash());


const server = http.createServer(app)
const io = socketio(server)

const {userConnected, connectedUsers, initializeChoices, moves, makeMove, choices} = require("./utils/users");
const {createRoom, joinRoom, exitRoom, rooms} = require("./utils/rooms");
const e = require("express");
const { exitCode } = require("process");

io.on("connection", socket => {
    socket.on("create-room", (roomId, username) => {
        if(rooms[roomId]){
            const error = "This room already exists";
            socket.emit("display-error", error);
        }else{
            userConnected(socket.client.id);
            createRoom(roomId, socket.client.id);
            socket.emit("room-created", roomId, username);
            socket.emit("player-1-connected");
            socket.join(roomId);
        }
    })

    socket.on("join-room", (roomId, username) => {
        if(!rooms[roomId]){
            const error = "This room doen't exist";
            socket.emit("display-error", error);
        }else{
            userConnected(socket.client.id);
            joinRoom(roomId, socket.client.id);
            socket.join(roomId);

            socket.emit("room-joined", roomId, username);
            socket.emit("player-2-connected");
            socket.broadcast.to(roomId).emit("player-2-connected");
            initializeChoices(roomId);
        }
    })


    socket.on("make-move", ({playerId, myChoice, roomId}) => {
        makeMove(roomId, playerId, myChoice);

        if(choices[roomId][0] !== "" && choices[roomId][1] !== ""){
            let playerOneChoice = choices[roomId][0];
            let playerTwoChoice = choices[roomId][1];

            if(playerOneChoice === playerTwoChoice){
                let message = "Both of you chose " + playerOneChoice + " . So it's draw";
                io.to(roomId).emit("draw", message);
                
            }else if(moves[playerOneChoice] === playerTwoChoice){
                let enemyChoice = "";

                if(playerId === 1){
                    enemyChoice = playerTwoChoice;
                }else{
                    enemyChoice = playerOneChoice;
                }

                io.to(roomId).emit("player-1-wins", {myChoice, enemyChoice});
            }else{
                let enemyChoice = "";

                if(playerId === 1){
                    enemyChoice = playerTwoChoice;
                }else{
                    enemyChoice = playerOneChoice;
                }

                io.to(roomId).emit("player-2-wins", {myChoice, enemyChoice});
            }

            choices[roomId] = ["", ""];
        }
    });

    socket.on("disconnect", () => {
        if(connectedUsers[socket.client.id]){
            let player;
            let roomId;

            for(let id in rooms){
                if(rooms[id][0] === socket.client.id || 
                    rooms[id][1] === socket.client.id){
                    if(rooms[id][0] === socket.client.id){
                        player = 1;
                    }else{
                        player = 2;
                    }

                    roomId = id;
                    break;
                }
            }

            exitRoom(roomId, player);

            if(player === 1){
                io.to(roomId).emit("player-1-disconnected");
            }else{
                io.to(roomId).emit("player-2-disconnected");
            }
        }
    })
})


server.listen(process.env.PORT, function () {
    console.log(`server is running in port: ${process.env.PORT}`)
})
const Routes = require('./routes/route')
app.use(Routes);

const ConnectionMongoDB = require('./models/mongoDb/connection')
ConnectionMongoDB()

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })