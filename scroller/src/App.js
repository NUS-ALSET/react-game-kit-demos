import React, { Component } from 'react';
import Splash from './splash';
import Game from './game';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  render() {
    this.gameStates = [
      <Splash onStart={this.handleStart} />,
      <Game onLeave={this.handleLeave} />,
    ];
    return this.gameStates[this.state.gameState];
  }

  handleStart() {
    this.setState({
      gameState: 1,
    });
  };

  handleLeave(index) {
    this.setState({
      gameState: 2,
    });
  };
}
