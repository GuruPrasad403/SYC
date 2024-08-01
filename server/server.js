import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
const PORT = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.get('/',(req,res)=>{
    res.send('HI from backend');
})



io.on('connection',(socket)=>{
    console.log(`socket.id ${socket.id} has been connected`)
// socket.on('message',(data)=>{
//     socket.emit('rec-msg',data)
// })

socket.on('room-id',(data)=>{
    console.log(data)
    socket.join(data)
    io.to(data).emit('joinmessage',`you have been joined the room id:${data}`)
})


socket.on('current-msg',({room,name,mess})=>{
    console.log(room,mess,name)
    io.to(room).emit('rec-msg',{
        room,mess,name
    })
})

    socket.on('disconnect',()=>{
        console.log(`socket.id ${socket.id} has been disconncted`)
    })
})

server.listen(PORT,()=>{
    console.log("the server has been started");
})