import * as firebase from "firebase";

let database;
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
export const init = () => {
    var config = {
      apiKey: "AIzaSyC8XhJs3X_-vpoOmvS6HShJPZdwjaE_39k",
      authDomain: "react-timer-c4024.firebaseapp.com",
      databaseURL: "https://react-timer-c4024.firebaseio.com",
      projectId: "react-timer-c4024",
      storageBucket: "",
      messagingSenderId: "990870043209"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}
