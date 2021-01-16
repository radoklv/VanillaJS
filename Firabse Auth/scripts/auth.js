//listen for auth status changed
auth.onAuthStateChanged((user) => {
  if (user) {
    //get data from firestore
    db.collection("guides").onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
        setupNavLinks(user);
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    setupNavLinks();
    setupGuides([]);
  }
});

//add new guide
const guideForm = document.querySelector("#create-form");
guideForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("guides")
    .add({
      title: guideForm.title.value.trim(),
      content: guideForm.content.value.trim(),
    })
    .then((res) => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      guideForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//signup
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = signupForm["signup-username"].value.trim();
  const email = signupForm["signup-email"].value.trim();
  const password = signupForm["signup-password"].value.trim();
  const bio = signupForm["signup-bio"].value.trim();

  //sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      return db.collection('users').doc(res.user.uid).set({
        username,
        bio,
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  auth
    .signOut()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm["login-email"].value.trim();
  const password = loginForm["login-password"].value.trim();

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
