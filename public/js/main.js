const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector(".chat-messages")
const socket = io();
const userList = document.getElementById('users')
const roomName = document.getElementById('room-name')

//get username and room form url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//join chatroom

socket.emit('joinRoom', {username,room})

//get room and users
socket.on("roomUsers", ({room, users}) => {
    outputRoomName(room);
    outputUsers(users)
})


// message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message)

  //scroll down

  chatMessages.scrollTop = chatMessages.scrollHeight
});

//message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // geting message
    const msg = e.target.elements.msg.value

    //Emit  message to  server
    socket.emit('chatMessage', msg)

    // clear input

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus()
})

//outputmessage to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to Dom
function outputRoomName(room){
    roomName.innerText = room
}

// users to dom

function outputUsers(users){
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join("")}`
}