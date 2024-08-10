
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 


 const firebaseConfig = {
   apiKey: "AIzaSyAzBJs7gjLFFydpoG8YQ-vbLDM0TsJ6VzA",
   authDomain: "teamace-4e45f.firebaseapp.com",
   projectId: "teamace-4e45f",
   storageBucket: "teamace-4e45f.appspot.com",
   messagingSenderId: "231821369549",
   appId: "1:231821369549:web:d65af7c54fa6c427fa4984",
   measurementId: "G-T3WT782EC5"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);


 //inputs 
 const LoginEmail = document.getElementById('loginEmail').value;
 const LoginPass = document.getElementById('login-password').value;

 //loginbutton
 const submit = document.getElementById("submit").value;
 submit.addEventListner("click",(e)=>{
    e.preventDefault();
    alert("clicked");
 })