import React, { Component } from 'react';
import TimerList from './TimerList.js';
import * as firebase from "firebase";


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyC8XhJs3X_-vpoOmvS6HShJPZdwjaE_39k",
  authDomain: "react-timer-c4024.firebaseapp.com",
  databaseURL: "https://react-timer-c4024.firebaseio.com",
  projectId: "react-timer-c4024",
  storageBucket: "",
  messagingSenderId: "990870043209"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storedTimers: [
        {name: "coffee", limit: 20},
        {name: "breakfast", limit: 10}
      ]
    }
  }

  componentWillMount(){
    var database = firebase.database();
    var ref = database.ref('/timer/')
    ref.set({
      "user": "Krys",
      "action": "login", 
      "timestamp": firebase.database.ServerValue.TIMESTAMP
    });
      
    }
    
  


  generateTimers() {
        return <TimerList timers={this.state.storedTimers}/>
  }

  render() {
    return (<div>{this.generateTimers()}</div>);
  }
}

export default App;
