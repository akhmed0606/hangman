import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxfO-4udRA7VuT-3aVSl443OZ7ru3Z7Vg",
  authDomain: "hangman-238a0.firebaseapp.com",
  databaseURL: "https://hangman-238a0-default-rtdb.firebaseio.com",
  projectId: "hangman-238a0",
  storageBucket: "hangman-238a0.appspot.com",
  messagingSenderId: "425693437828",
  appId: "1:425693437828:web:08b946ac544c3622a687d1"
};

firebase.initializeApp(firebaseConfig);
export default firebase;