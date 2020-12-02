

//  --------- signup ----------------
  

   //grab the form
const signUpForm = document.querySelector('#signup-form');
  signUpForm.addEventListener('submit',(e) =>{
      e.preventDefault();

      //get user info
      const email = signUpForm['signup-email'].value;
      const password = signUpForm['signup-password'].value;

      //sign up the user
      auth.createUserWithEmailAndPassword(email,password).then(cred => {
            return db.collection('users').doc(cred.user.uid).set({
                bio:signUpForm['signup-bio'].value,
            });
      }).then(() => {
        // console.log(cred.user);
        modalClose('#modal-signup',signUpForm)
      })

  })




  // ------------- signout -------------------

  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) =>{
      e.preventDefault();

      auth.signOut()

  })

  // ------------- login ------------------

  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

       const email = loginForm['login-email'].value;
       const password = loginForm['login-password'].value;

       auth.signInWithEmailAndPassword(email,password).then(cred => {
        //    console.log('you are now signIn.' ,cred.user)
        modalClose('#modal-login',loginForm)
          
       })
  })


  
  // --------- track user auth status changes -------------

  auth.onAuthStateChanged(user => {
        // ------------------- get data from firestore ------------------
      if(user){
        db.collection('guides').onSnapshot(snapshot => {
            setUpNavUI(user)
            setUpGuides(snapshot.docs);
            
        }, err => {
            console.log(err.message)
        })
      }else{
        setUpNavUI()
        setUpGuides([]);
      }
  
})



// --------- addding Guides to firestore ---------------

const createGuideForm = document.querySelector('#create-form');

createGuideForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
       title:createGuideForm['title'].value,
       content: createGuideForm['content'].value
    }).then(() => {
        modalClose('#modal-create',createGuideForm)
    }).catch(err => {
        console.log(err.message)
    })
})




// closing modal function

const modalClose = (modalId,form) =>{
    const modal = document.querySelector(modalId);
    M.Modal.getInstance(modal).close();
    form.reset();
}