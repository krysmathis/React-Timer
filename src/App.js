import React, { Component } from 'react';
import './App.css';
import TimerList from './TimerList.js';

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

  generateTimers() {
        return <TimerList timers={this.state.storedTimers}/>
  }

  render() {
    return (this.generateTimers());
  }
}

export default App;
