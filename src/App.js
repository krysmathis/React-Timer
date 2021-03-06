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
      updateMode: false,
      title: "",
      time: "",
      id: ""
    }
    // handle the binding of the input forms 'this' is available
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  // Updating the record of when the user logs in
  componentWillMount(){
    const ref = database.ref('/timer/');
    
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
    });
    // clear the input form
    this.clearForm();
  }

  clearForm = () => {
    // clear the input form
    this.setState({
      title: "",
      time: ""
    });
  }

  handlePut = () => {

    let postData = {
      name: this.state.title,
      limit: this.state.time
    }
    
    let updates = {};
    updates['/timer/' + this.state.id] = postData;

    firebase.database().ref().update(updates);
    
    this.setState({
       updateMode: false
    });
    this.clearForm();
  
  }
    // Send data up to the database
  handleDelete(id) {
    const ref = database.ref('/timer/' + id);
    ref.remove();
  }

  handleUpdate = (timerObj) => {
    
    this.setState({
      updateMode: true,
      title: timerObj.title,
      time: timerObj.time,
      id: timerObj.id
    });

  }
  // for the renderer to render a timer for each of the storedTimers
  generateTimers() {
        return <Collection><TimerList timers={this.state.storedTimers} delete={this.handleDelete} update={this.handleUpdate}/></Collection>
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
          // handle post or update
        if (this.state.updateMode === true) {
          this.handlePut();
        } else {
            this.handlePost(this.state.title, this.state.time);
        }
  
      }
      event.preventDefault();
  }

  // display the form if the database load is complete
  displayForm() {
    return (
      <div> 
        <Row>
            {this.state.updateMode === true ?
              <form onSubmit={this.handleSubmit}>
                <Input type="text" name="title" label="Timer Name" value={this.state.title} onChange={this.handleNameChange} />
                <Input type="text" name="time" label="Time Limit" value={this.state.time  } onChange={this.handleTimeChange} />
                <Button floating large className='red' waves='light' icon='add' type="submit" onClick={this.handleSubmit} value="">Click</Button>
              </form>
            : null}
            {this.state.updateMode === false ?
            <form onSubmit={this.handleSubmit}>
              <Input type="text" name="title" label="Timer Name" value={this.state.title} onChange={this.handleNameChange} />
              <Input type="text" name="time" label="Time Limit" value={this.state.time  } onChange={this.handleTimeChange} />
              <Button floating large className='red' waves='light' icon='add' type="submit" onClick={this.handleSubmit} value="">Click</Button>
            </form>
            : null}
          </Row>
          
      </div>
    );
  }


  render() {
    return (

      <Row className="timer__main">
        <div>
        <h4>My Stored Timers</h4>

        </div>
      <div>
        { this.displayForm() }
        {this.state.isLoading===true ? "Loading..." : this.generateTimers() }
      </div>
      </Row>
    );
  }
}

export default App;
