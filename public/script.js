const msgContainer = document.getElementsByClassName('chat')[0];
const inp = document.getElementById('inp');
const btn = document.getElementById('btn');
const socket = io();

function msgSend(){
    let message = inp.value;
    if(inp.value !== ''){
        socket.emit('msg', {msg: message})
    }
};

socket.on('server_msg', (socket) => {
    let para = document.createElement('p');
    para.textContent = socket.msg;
    msgContainer.appendChild(para)
});

btn.addEventListener('click', msgSend);