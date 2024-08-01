
import { initializeApp } from "firebase/app";
import{getAuth}from 'firebase/auth'
import{GoogleAuthProvider}from'firebase/auth'

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
export const auth = getAuth(app)
export const googleSignIn = new GoogleAuthProvider(app)