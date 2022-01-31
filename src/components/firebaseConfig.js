import firebase from 'firebase/compat/app';
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  dataBaseURL: `https://${process.env.REACT_APP_FIREBASE_ID}-default-rtdb.firebaseio.com`,
};

firebase.initializeApp(firebaseConfig);
export default firebase;