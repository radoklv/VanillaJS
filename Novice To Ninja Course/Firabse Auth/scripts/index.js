const guideList = document.querySelector(".guides");
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out')
const accountModal = document.querySelector('.modal-content .account-details');

//setup guide list
const setupGuides = (data) => {
  if(data.length){
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      let li = `<li>
                  <div class="collapsible-header grey lighten-4">${guide.title}</div>
                  <div class="collapsible-body white">${guide.content}</div>
                </li>`;
        html += li;
    });
    guideList.innerHTML = html;
  }else{
    guideList.innerHTML = '<h4 style="text-align: center">Please log in to view the documents.</h4>'
  }
};


//setup navbar links
const setupNavLinks = (user) =>{
  if(user){
    // console.log(user.uid)

    db.collection('users').doc(user.uid).get().then(res =>{
      const userData = res.data();
      accountModal.innerHTML = `<p>The user "${userData.username}" is logged in with ${user.email}<br>His bio is "${userData.bio}"<p>`
    });
    loggedInLinks.forEach(link => { link.style.display = 'block'})
    loggedOutLinks.forEach(link => { link.style.display = 'none'})
  }else{
    accountModal.textContent = `There is no Logged in user!`;
    loggedInLinks.forEach(link => { link.style.display = 'none'})
    loggedOutLinks.forEach(link => { link.style.display = 'block'})
  }
}



//setup meterialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
