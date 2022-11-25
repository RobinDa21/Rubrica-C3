import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBogqbEHiZ8-klDTBO_4YPu7r8uSZEDCvg",
    authDomain: "logincrud-11cd7.firebaseapp.com",
    projectId: "logincrud-11cd7",
    storageBucket: "logincrud-11cd7.appspot.com",
    messagingSenderId: "765114308504",
    appId: "1:765114308504:web:633af37e2bb386a3cd3ded"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);
const db = app.firestore()
const auth = app.auth()

export {db, auth}