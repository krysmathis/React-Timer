import React, { Component } from 'react';
import Timer from './Timer.js';
class TimerList extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {
        console.log(this.props)
    }
    showTimers = () => {
        this.timers=[];
        this.props.timers.forEach(t=> {
            this.timers.push(<TimerItem name={t.name} limit={t.limit}/>)
        })
        return this.timers;
    }

    render() {
        return (
            <div>
                {this.showTimers()}
            </div>
        );
    }
    
}

export default TimerList;

class TimerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runTimer: false
        }

    }
    
    
    toggleRun = () => {
        if (this.state.runTimer) {
            this.setState({runTimer: false});
        } else {
            this.setState({runTimer:true});
        }

    }

    render() {
        return (
            <div>
                <span onClick={this.toggleRun}>Timer: {this.props.name} Length: {this.props.limit}s </span>
                {this.state.runTimer ? <Timer name={this.props.name} limit={this.props.limit}/> : null}
            </div>
        );
    }
}