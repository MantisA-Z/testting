let rooms = new Set();
let userCount = new Set();

function addUserCount(socket){
    userCount.add(socket.id)
    console.log(userCount)
};

function socketOn(socket, io){
    socket.on('disconnect', () => {
        userCount.delete(socket.id)
        console.log(userCount.size);
    })

    socket.on('msg', (data) => {
        io.emit('server_msg', {msg: data.msg})
    })

    socket.on('msgToRoom', (data) => {
        let msg = data.msg
        io.to(msg).emit('serverMsgToRoom', {msg: msg})
        console.log(data)
    })

    socket.on('roomCreate', (data) => {
        if(!rooms.has(data.name)){
            socket.join(data.name)
            rooms.add(data.name)
            console.log(rooms.size, rooms.entries)
            console.log(data.name)
        }else{
            console.log('No room available with that name')
        }
    })
    socket.on('roomJoin', (data) => {
        if(rooms.has(data.name)){
            socket.join(data.name)
        }else{
            console.log('No room exists with that name')
        }
    })
};

module.exports = {socketOn, addUserCount};