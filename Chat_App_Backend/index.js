var express = require('express')
// const httpServer =require('http')
var app = express()
const io = require('socket.io')(6600,{
    cors:{
        origin:'*'
    }
});

const users={};
io.on('connection',socket=>{
    socket.on('newiuser-joined',name=>{
        console.log('newuser',name);
        users[socket.id]=name;
        socket.broadcast.emit('userjoined',name)
    });
    socket.on('send',message=>{
        console.log('hhi rerecevie',message,users);
        socket.broadcast.emit('recevie',{message:message,name:users[socket.id]});
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];    
    })
})