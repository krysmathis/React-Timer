import React from 'react';

/*
    The TimerList component generates the TimerListItems
*/
class TimerList extends React.Component {
  

    showTimers = () => {
        const timers= this.props.timers;
        const listTimers = timers.map((timer, index) => 
            <div key={index}><TimerItem name={timer.name} limit={timer.limit} /></div>
        );
        return (<ul>{listTimers}</ul>);
    }

    render() {
        return (
            <ul>
                {this.showTimers()}
            </ul>
        );
    }
    
}

export default TimerList;

/*
    The timer item calls the actual timer itself
    State: 
        - runTimer: a toggle on and off that controls the rendering of 
                    the timer component
*/
class TimerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runTimer: false
        }

    }
    
    // Allow the user to toggle the timer on an off
    toggleRun = () => {
        if (this.state.runTimer) {
            this.setState({runTimer: false});
        } else {
            this.setState({runTimer:true});
        }

    }

    // If the user does not click on the timer item, a timer will not render
    render() {
        return (
            <div>
                <span onClick={this.toggleRun}>Timer: {this.props.name} Length: {this.props.limit}s </span>
                {this.state.runTimer ? <Timer name={this.props.name} limit={this.props.limit}/> : null}
            </div>
        );
    }
}

/*
    Timer component:
    Props: 
        - name set by App.js
        - limit set by App.js
*/
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        }
    }
    
    /*
        Mount the timer and start the clock. This method uses
        Object.assign to copy the current state, which contains time
        and set a new value for time using the previous time value
    */
    componentWillMount() {
        
        this.timerId = setInterval(() => {
            const prevState = Object.assign({}, this.state);
            this.setState({time: prevState.time += 1});
        }, 1000);
        console.log(this.props);
    }

    // When the component is removed from the DOM, clear the setInterval
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    // This function ensures the component knows when it has exceede the time limit
    isExpired = () => this.state.time > this.props.limit ? true : false;

    // Toggle function for updating the display based on how much time
    // has passed relative to the time limit
    displayTime = () => {
        if (this.isExpired() === true) {
            clearInterval(this.timerId);
            return <div>Timer Expired</div>
        } else {
            return <div>This is the {this.props.name} timer and it displays {this.state.time}</div>
        }
    }

    render() {
        return(this.displayTime());
    }
}
