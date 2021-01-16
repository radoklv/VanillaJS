class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    const now = new Date();
    const newMessage = {
      message,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now),
      room: this.room,
    };

    const response = await this.chats.add(newMessage);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            callback(change.doc.data());
          }
        });
      });
  }

  updateName(username) {
    localStorage.setItem('username', username);
    this.username = username;
  }

  updateRoom(room) {
    this.room = room;
    console.log("Room Changed!");
    if (this.unsub) {
      this.unsub();
    }
  }
}

