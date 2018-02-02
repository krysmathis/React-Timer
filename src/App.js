import React, { Component } from 'react';
import TimerList from './TimerList.js';
import * as firebase from "firebase";
import {Button, Collection, Row, Input} from 'react-materialize'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC8XhJs3X_-vpoOmvS6HShJPZdwjaE_39k",
  authDomain: "react-timer-c4024.firebaseapp.com",
  databaseURL: "https://react-timer-c4024.firebaseio.com",
  projectId: "react-timer-c4024",
  storageBucket: "",
  messagingSenderId: "990870043209"
};

firebase.initializeApp(config);
const database = firebase.database();

/*
  The app controls:
  1. Manipulating the data from and to the database
  2. It renders the TimerList

*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storedTimers: [],
      showTimers: false,
      showForm: false,
      isLoading: true,
    }
    // handle the binding of the input forms 'this' is available
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  // Updating the record of when the user logs in
  componentWillMount(){
    const ref = database.ref('/timer/');
    // Attach an asynchronous callback to read the data at our posts reference
      ref.on("value", (snapshot) => {

        let data = snapshot.val();
        if (data === null) {
          return;
        }
        // convert the object into an array of values
        let timers = Object.keys(data).map(key => {
            data[key].id = key;
            return data[key];
        });
        this.setState({
          storedTimers: timers,
          isLoading: false
        });
          
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
  }
  
  
    
  
  // Send data up to the database
  handlePost(name, time) {
    const ref = database.ref('/timer/');
    ref.push({
      "name": name,
      "limit": time
    })
  }

    // Send data up to the database
  handleDelete(id) {
    const ref = database.ref('/timer/' + id);
    ref.remove();
  }

  // for the renderer to render a timer for each of the storedTimers
  generateTimers() {
        return <Collection><TimerList timers={this.state.storedTimers} post={this.handlePost} delete={this.handleDelete}/></Collection>
  }

  // tied to the name input
  handleNameChange(event) {
    this.setState({title: event.target.value});
  }

  // tied to the time input
  handleTimeChange (event) {
    this.setState({time: event.target.value});
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // Preparing the data for the post request
  handleSubmit = (event) => {
      
      if (this.state.title.length > 0 && this.isNumeric(this.state.time)) {
          this.handlePost(this.state.title, this.state.time);
          this.setState({
            title: "",
            time: ""
          });
      }
      event.preventDefault();
  }

  // display the form if the database load is complete
  displayForm() {
    return (
      <div> 
        <Row>
          <form onSubmit={this.handleSubmit}>
              <Input type="text" name="title" label="Timer Name" value={this.state.name} onChange={this.handleNameChange} />
              <Input type="text" name="time" label="Time Limit" value={this.state.seconds} onChange={this.handleTimeChange} />
              <Button floating large className='red' waves='light' icon='add' type="submit" onClick={this.handleSubmit} value="">Click</Button>
          </form>
        </Row>
          
      </div>
    );
  }


  render() {
    return (

      <Row className="timer__main">
        <div>
        <h4>ReactTimer</h4>

        </div>
      <div>
        {this.state.isLoading===true ? "Loading..." : this.generateTimers() }
        { this.displayForm() }
      </div>
      </Row>
    );
  }
}

export default App;
