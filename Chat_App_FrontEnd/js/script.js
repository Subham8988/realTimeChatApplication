const socket = io('http://localhost:6600');

const form =document.getElementById('send-container');
const msgInput = document.getElementById('msgInput');
const messageContainer = document.querySelector('.container');
const names = prompt("Enter Your name to join");
var audio = new Audio('ting.mp3')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const messagee = msgInput.value;
    append(` you : ${messagee}`,'right');
    socket.emit('send',messagee);
    msgInput.value=''
})

const append =(message,postion)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(postion);
    messageContainer.append(messageElement);
    if(postion == 'left')
    {
        audio.play()
    }
}
socket.emit('newiuser-joined',names);
socket.on('userjoined',data=>{
    append(`${data} join the chat`,'right')
})
socket.on('recevie',data=>{
    console.log('data  in recive',data);
    append(`${data.name} ${data.message}`,'left')
})

socket.on('left',name=>{
  append(`${name} left the chat`,'left');
})