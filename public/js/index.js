var socket=io();

    socket.on('connect',()=>{
    console.log(' connected to server')

    socket.emit('createMessage',{
        to:'Tusahr',
        text:'hello world this is client'
    })
})

    socket.on('disconnect',()=>{
    console.log(' disconnected to server')
})
 
socket.on('newMessage',(message)=>{
    console.log('New message',message)
})

