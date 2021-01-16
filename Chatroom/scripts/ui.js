class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear(){
      this.list.innerHTML = '';
  }

  render(data) {
    let when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    let html = `
             <li class="p-2 my-2">
                 <span class="font-weight-bold">${data.username}</span> <span>${data.message}</span>
                <p class="text-muted time">${when}</p>
            </li>`;

    this.list.innerHTML += html;
  }
}
