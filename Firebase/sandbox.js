const list = document.querySelector(".list");
const form = document.querySelector("form");
const unsubBtn = document.querySelector(".unsub")

const now = new Date().getTime();

const addRecipe = (recipe, id) => {
  const time = new Date(now - recipe.created_at.seconds).toDateString();
  let html = `
  <li data-id="${id}">
  Title: ${recipe.title}<br>
  Author ${recipe.author},<br>
  Created at: ${time}
  <button class="btn btn-danger">Delete</delete>
  </li>`;
  list.innerHTML += html;
};

const removeRecipe = (id)=>{
    const recipes = document.querySelectorAll('.list li')

    recipes.forEach(recipe =>{
        const recipeId = recipe.getAttribute('data-id');
        
        if(recipeId == id){
            recipe.remove();
        }
    })


}

//Static Get documents
// db.collection("recipes")
//   .get()
//   .then((snapshot) => {
//     // console.log(snapshot.docs[0].data())
//     snapshot.docs.forEach((doc) => {
//       addRecipe(doc.data(), doc.id);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//Auto Get documents
//db.collection returns unsubscribe function
const unsub = db.collection('recipes').onSnapshot(snapshot =>{
    // console.log(snapshot.docChanges())
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc
        if(change.type == 'added'){
            addRecipe(doc.data(), doc.id)
        }else if(change.type == 'removed'){
            removeRecipe(doc.id)
        }

    })
})

unsubBtn.addEventListener('click', () =>{
    if(confirm('Do you really wonna to Unsubscribed from realtime changes?')){
        unsub()
    }else{
        return;
    }
})  



//Add documents
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const now = new Date();

  const newRecipe = {
    author: form.author.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(now),
    title: form.recipe.value.trim(),
  };

  form.reset()

  db.collection("recipes")
    .add(newRecipe)
    .then(() => {
      console.log('Recipe Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete document

list.addEventListener('click', e =>{
    if(e.target.nodeName == "BUTTON"){
        const id = e.target.parentElement.getAttribute('data-id');

        db.collection('recipes').doc(id).delete().then(() =>{
            console.log('Recipe Deleted');
        }).catch(err =>{
            console.log(err);
        })
    }
})

