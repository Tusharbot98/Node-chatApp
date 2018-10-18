const path = require('path');
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')


const app =  express();
const publicPath = path.join(__dirname,'/../public')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('new user connected')
    
    socket.emit('newMessage',{    
        from:'Tusahr',
        text:'hello world',
        createdAt:'12:300'
    })
    socket.on('createMessage',(message)=>{
        console.log(message)
    })

    socket.on('disconnect',()=>{
        console.log(' user is disconnected ')
    })

    
})

app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server running on ${port}`)
})