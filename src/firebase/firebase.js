import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "memberlist-d4485.firebaseapp.com",
  databaseURL: "https://memberlist-d4485.firebaseio.com",
  projectId: "memberlist-d4485",
  storageBucket: "memberlist-d4485.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config)

export default firebase;