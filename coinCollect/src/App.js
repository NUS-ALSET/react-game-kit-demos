import React, { Component } from 'react';
import Splash from './splash';
import Game from './game';
import GameStore from './game/stores/game-store';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 1,
      gameMode: 'player-vs-player', //modes: player-vs-player, player-vs-bot, bot-vs-bot
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  render() {
    return (
        <div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                key="player-vs-player"
                onLeave={this.handleLeave}
                mode='player-vs-player'
            />
          </div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                key="player-vs-bot"
                onLeave={this.handleLeave}
                mode='player-vs-bot'
            />
          </div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                key="bot-vs-bot"
                onLeave={this.handleLeave}
                mode='bot-vs-bot'
            />
          </div>
        </div>
    )
  }

  handleStart(index) {
    // if(index === 0) {
    //   GameStore.gameMode.playerVsPlayer = true
    // } else if(index === 1) {
    //   GameStore.gameMode.playerVsBot = true
    // } else if(index === 2) {
    //   GameStore.gameMode.botVsBot = true
    // }
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
