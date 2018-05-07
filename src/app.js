
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/node_modules"));

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function (socket) {

    console.log('a user connected');

    socket.on('msg', function (msg) {

        console.log(`User MSG: ${msg}`);

        socket.broadcast.emit("msg",msg);

    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

const porta = 4200

http.listen(4200, function () {
    console.log(`Server On Rodando na porta ${porta}`);
});