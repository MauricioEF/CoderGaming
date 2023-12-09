//Init
const currentImage = document.getElementById('currentImage');
const chatBox = document.getElementById('chatBox');
const sendButton = document.getElementById('sendButton');
const chatPanel = document.getElementById('chatContent');

const loadingText = document.getElementById('loadingText');
loadingText.innerHTML = 'Obteniendo mensajes...';

const path = window.location.pathname;
const videogameId =  path.split('/')[path.split('/').length-1];

let user;
const socket = io({
  autoConnect: false,
});

fetchUser();

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    //Intención de envío de mensaje
    if (chatBox.value.trim().length > 0) {
      //El mensaje sí tiene por lo menos una letra
      const messageBody = {
        room: videogameId,
        userId: user.id,
        username: user.name,
        body: chatBox.value.trim(),
      };
      socket.emit('chat:message', messageBody);
      chatBox.value = '';
    }
  }
});

sendButton.addEventListener('click', (event) => {
  //Intención de envío de mensaje
  if (chatBox.value.trim().length > 0) {
    //El mensaje sí tiene por lo menos una letra
    const messageBody = {
        room:videogameId,
        userId: user.id,
        username: user.name,
        body: chatBox.value.trim(),
    };
    socket.emit('chat:message', messageBody);
    chatBox.value = '';
  }
});


//SOCKET EVENTS

socket.on('chat:logMessage',message=>{
    const p = document.createElement('p');
    p.innerHTML = user.id === message.userId?message.body:`${message.username} dice: ${message.body}`;
    chatPanel.appendChild(p);
})

//FUNCTIONS
async function fetchUser() {
  const response = await fetch('/api/sessions/current');
  if (response.status === 200) {
    const result = await response.json();
    user = result.payload;
    await fetchMessages();
    await socket.connect();
    socket.emit('chat:joinroom',videogameId)
  } else {
    loadingText.innerHTML =
      'Para poder participar en el chat, debes estar logueado';
    chatBox.setAttribute('disabled', true);
    sendButton.setAttribute('disabled', true);
  }
}

async function fetchMessages() {
    const response = await fetch(`/api/messages/${videogameId}`);
    if(response.status===200){
        const result = await response.json();
        const messages = result.payload;
        if(messages.length>0){
            const fragment = document.createDocumentFragment();
            for(const message of messages){
                const p = document.createElement('p');
                p.innerHTML = user.id === message.userId?message.body:`${message.username} dice: ${message.body}`;
                fragment.appendChild(p);
            }
            chatPanel.appendChild(fragment);
            loadingText.remove();
        }else{
            loadingText.innerHTML="Aún no hay mensajes de este juego, ¡Sé el primero en participar"
        }
    }else{
        loadingText.innerHTML = "Error al obtener los mensajes previos, aún puedes participar"
    }
}


async function addVideogame(id) {
  const library = getCookie('library');
  if (library) {
    //Mientras haya librería temporal, es porque no hay usuario
    const response = await fetch(`/api/libraries/${library}/videogames/${id}`, {
      method: 'PUT',
    });
    const result = await response.json();
    console.log(result);
  } else {
    //Si no encontró la cookie, es porque ya hay un usuario
    const response = await fetch(`/api/libraries/videogames/${id}`, {
      method: 'PUT',
    });
    const result = await response.json();
    console.log(result);
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function changeCurrentImage(image) {
  currentImage.src = image;
}
