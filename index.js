const express = require('express');
const http = require('http');
const app = express();
const {socketOn, addUserCount} = require('./socket/socketFunction');
const PORT = process.env.PORT || 80;

const server = http.createServer(app);
server.listen(PORT, () => {console.log(`server started at port ${PORT}...`)})
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

io.on('connection', (socket) => {
    addUserCount(socket)
    socketOn(socket, io);
})

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/Room', (req, res) => {
    res.render('Rooms')
})