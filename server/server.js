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
    

    socket.on('createMessage',(message)=>{
        console.log(message)
        io.emit('newMessage',{
             from :message.from ,
             text:message.text,
             createdAt:  new Date().getTime()
        })
    })

    socket.on('disconnect',()=>{
        console.log(' user is disconnected ')
    })
    
})

app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server running on ${port}`)
})