const express = require('express');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 80;

const server = http.createServer(app);
server.listen(PORT, () => {console.log(`server started at port ${PORT}...`)})
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

const userCount = new Set()
function findUsers(socket){
    userCount.delete(socket.id)
};

io.on('connection', (socket) => {
    userCount.add(socket.id);
    socket.on('disconnect', () => {
        findUsers(socket);
        console.log(userCount.size);
    })
    socket.on('msg', (socket) => {
        io.emit('server_msg', {msg: socket.msg})
    })
    console.log(userCount.size);
})

app.get('/', (req, res) => {
    res.render('index');
})