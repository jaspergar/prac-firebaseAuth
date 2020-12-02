// function that will create the guide list 
   const guidList = document.querySelector('.guides');
  

   const setUpGuides = (data) =>{
 
     let html = ' ';

   

     if(data.length){
      data.forEach(doc => {
        const guide = doc.data();
  
         const li = `
         <li>
         <div class="collapsible-header grey lighten-4">${guide.title}</div>
         <div class="collapsible-body white">${guide.content}</div>
       </li>
         `
  
         html += li
       });
       
       guidList.innerHTML = html;
     }else{
       html = ' <h5 class="center-align"> Login to see guides </h5>'
       guidList.innerHTML = html;
     }
    
   }

// function that will make the navbar status change when login or logout
   const loginLinks = document.querySelectorAll('.logged-in');
   const logoutLinks = document.querySelectorAll('.logged-out');
   const accountDetails = document.querySelector('.account-details')

   const  setUpNavUI = (user) => {
     if(user){
      //account info
      db.collection('users').doc(user.uid).get().then(doc => {
       const html = ` <div> logged in as ${user.email}</div>
       <div> ${doc.data().bio}</div>
       `

       accountDetails.innerHTML = html
      })

       loginLinks.forEach(item => item.style.display = "block");
       logoutLinks.forEach(item => item.style.display = "none");
     }else{
      loginLinks.forEach(item => item.style.display = "none");
      logoutLinks.forEach(item => item.style.display = "block");
     }
   }



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});