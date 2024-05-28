const msgContainer = document.getElementsByClassName('chat')[0];
const inp = document.getElementById('inp');
const socket = io();

function msgSend(){
    let message = inp.value;
    if(inp.value !== ''){
        socket.emit('msg', {msg: message})
    }
};

function sendMsgInRoom(){
    const msg = document.getElementById('inp_room_name').value;
    socket.emit('msgToRoom', {msg})
}

function createRoom(){
    const name = document.getElementById('inp_room_name').value;
    socket.emit('roomCreate', {name})
};

function joinRoom(){
    const name = document.getElementById('inp_room_name').value;
    socket.emit('roomJoin', {name})
};

socket.on('server_msg', (data) => {
    let para = document.createElement('p');
    para.textContent = data.msg;
    msgContainer.appendChild(para)
});

socket.on('serverMsgToRoom', (data) => {
    console.log(data)
})
