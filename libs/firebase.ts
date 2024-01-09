// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxxmn472nnEswtnM-hetZ0dBXM7sI5OWU",
  authDomain: "my-store-4eadc.firebaseapp.com",
  projectId: "my-store-4eadc",
  storageBucket: "my-store-4eadc.appspot.com",
  messagingSenderId: "470517809980",
  appId: "1:470517809980:web:2dcb0d08d3eac3d893d439",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
