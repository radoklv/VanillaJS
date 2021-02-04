const list = document.querySelector(".chat-list");
const usernameForm = document.querySelector(".new-name");
const messageForm = document.querySelector(".new-chat");
const updateMsg = document.querySelector(".update-msg");
const roomBtns = document.querySelectorAll(".chat-rooms .btn");


const username = localStorage.username ? localStorage.username : 'Anonumus';

const chatUI = new ChatUI(list);
const chatroom = new Chatroom("one", username);

chatroom.getChats((doc) => {
  chatUI.render(doc);
});

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = usernameForm.name.value.trim();
  chatroom.updateName(name);

  updateMsg.textContent = `Your username was changed to ${name}`;
  setTimeout(() => {
    updateMsg.textContent = "";
  }, 3000);

  usernameForm.reset();
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = messageForm.message.value.trim();
  chatroom.addChat(msg).then(()=>{
    messageForm.reset();
  }).catch(err =>{
      console.log(err);
  });
});

//Event Listeners
roomBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    roomBtns.forEach((btn) => {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
    });
    e.target.classList.add("active");
    chatroom.updateRoom(e.target.id);
    chatUI.clear(); 
    chatroom.getChats((doc) => {
        chatUI.render(doc);
      });
  });
});
