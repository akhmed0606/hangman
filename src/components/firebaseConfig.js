import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  dataBaseURL: `https://${process.env.REACT_APP_FIREBASE_ID}-default-rtdb.firebaseio.com`,
};

function initFirebase() {
    if(!firebase.getApps.length){
        firebase.initializeApp(firebaseConfig)
    }
}
initFirebase()
export default firebase;