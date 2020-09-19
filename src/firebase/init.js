 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDygvk0eZ2I_7JW-Q2YTE4Gf1OXv8RyFtY",
    authDomain: "mikeyt-chat.firebaseapp.com",
    databaseURL: "https://mikeyt-chat.firebaseio.com",
    projectId: "mikeyt-chat",
    storageBucket: "mikeyt-chat.appspot.com",
    messagingSenderId: "842044105192",
    appId: "1:842044105192:web:b9ab52325a912d175b045d",
    measurementId: "G-PM8QK476YB"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()