

// Setando os tipos de dados para área de login
const usuariosLogin = [
    { usuario: "admim", senha: "admim", type: "admim" },
    { usuario: "aluno", senha: "aluno", type: "aluno" }
];

const privateKey = "123456789"
// fim Setando os tipos de dados



const cookieParser = require('cookie-parser')
const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

var os = require('os'),
    cpuCount = os.cpus().length;
console.log(`Número de CPU: ${cpuCount}`);

//Config EXPRESS

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/assets"));

app.use(cookieParser());

//Fim Config EXPRESS

const http = require("http").Server(app);
const io = require("socket.io")(http);



//Rotas

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
});

app.post("/login", (req, res) => {

    let body = req.body;
    
    jwt.sign( body , privateKey , (err, token) => {
        console.log(token);
    });

})

app.use("/home", (req, res, next) => {

    cookies = req.cookies

    next();
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});
//Fim Rotas



io.emit('some event', { for: 'everyone' });

io.on('connection', function (socket) {

    console.log('a user connected');

    socket.on('msg', function (msg) {

        console.log(`User MSG: ${msg}`);

        socket.broadcast.emit("msg", msg);

    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

const porta = 4200

http.listen(porta, function () {
    console.log(`Server On Rodando na porta ${porta}`);
});

let numeroStance = process.env.NODE_APP_INSTANCE | 1;

console.log(`NODE STANCE: ${process.env.NODE_APP_INSTANCE} + ${numeroStance}`);