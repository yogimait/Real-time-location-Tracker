const express = require('express');
const app = express();
const path = require('path');

const http = require("http");
const socketio =require('socket.io');

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

io.on("connection",function (socket){
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id: socket.id, ...data});
    })
    socket.on("Disconnect",function(){
        io.emit("User-disconnected",socket.id);
    })

});

app.get("/",function(req,res){
    res.render("index");
})

server.listen(3000);