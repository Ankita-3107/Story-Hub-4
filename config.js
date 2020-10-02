import * as firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCcGapqr6V127l4BcUDZ2sO7rvPItIv4qo",
    authDomain: "story-hub-7fe2a.firebaseapp.com",
    databaseURL: "https://story-hub-7fe2a.firebaseio.com",
    projectId: "story-hub-7fe2a",
    storageBucket: "story-hub-7fe2a.appspot.com",
    messagingSenderId: "558110006436",
    appId: "1:558110006436:web:f5ce9ba057df60c09f9a31"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();