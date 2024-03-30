// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvCDcV4tpqWuJll2YyhkFVbT7Cigopl-w",
  authDomain: "email-password-auth-6a242.firebaseapp.com",
  projectId: "email-password-auth-6a242",
  storageBucket: "email-password-auth-6a242.appspot.com",
  messagingSenderId: "917204524142",
  appId: "1:917204524142:web:c2cf8e06d9da8b9882da7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {auth,app}
