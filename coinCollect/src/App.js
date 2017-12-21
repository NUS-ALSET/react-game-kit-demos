import React, { Component } from 'react';
import Game from './game/index';
import GameStore from './game/stores/game-store';
import GameStoreBot1 from './game/stores/game-store-bot1';
import GameStoreBot2 from './game/stores/game-store-bot2';

let player1 = [], player2 = [], bot1 = [], bot2 = [], bot3 = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 1,
    };
    this.getCommands = this.getCommands.bind(this);
  }

  getCommands(world) {
      if(world.youAre === 'player-vs-bot-bot-0') {
          bot1 = world;
      }
      if(world.youAre === 'bot-vs-bot-bot-0') {
          bot2 = world;
      }
      if(world.youAre === 'bot-vs-bot-bot-1') {
          bot3 = world;
      }
      console.log(bot1,bot2,bot3)
  }

  render() {
    return (
        <div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                gameStore={GameStore}
                key="player-vs-player"
                mode='player-vs-player'
                playersPosition={[{x: 64, y: 64 }, {x: 899, y: 450}]}
                coins={[0,0,0]}
                coinsPosition={[{x: 500, y: 285}, {x: 200, y: 324}, {x: 700, y: 200}]}
                rounds={3}
                coinInRound={15}
            />
          </div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                gameStore={GameStoreBot1}
                key="player-vs-bot"
                mode='player-vs-bot'
                player1={(world) => this.getCommands(world)}
                coins={[0,0,0,0]}
                rounds={3}
                coinInRound={7}
            />
          </div>
          <div style={{height: '100vh', width: '100%'}}>
            <Game
                gameStore={GameStoreBot2}
                key="bot-vs-bot"
                mode='bot-vs-bot'
                player1={(world) => this.getCommands(world)}
                player2={(world) => this.getCommands(world)}
                playersPosition={[{x: 64, y: 64 }, {x: 899, y: 450}]}
                coins={[0,0,0,0,0]}
                coinsPosition={[{x: 500, y: 285}, {x: 200, y: 324}, {x: 700, y: 200}]}
                rounds={3}
                coinInRound={5}
            />
          </div>
        </div>
    )
  }
}
