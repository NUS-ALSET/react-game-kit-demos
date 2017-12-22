import React, { Component } from 'react';
import Game from './game/index';
import GameStore from './game/stores/game-store';
import GameStoreBot1 from './game/stores/game-store-bot1';
import GameStoreBot2 from './game/stores/game-store-bot2';
import Matter from 'matter-js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 1,
    };
    this.getCommands = this.getCommands.bind(this);
  }

  move(body, x, y) {
      Matter.Body.setVelocity(body, { x, y });
  };

  getCommands(store, index, body) {
      let botPositionX = parseInt(body.position.x);
      let botPositionY = parseInt(body.position.y);

      let botLengthToCoin;
      let data = [], dataMin = [];
      for(let i = 0; i < store.coinPosition.length; i++) {
          botLengthToCoin = store.sort(store.coinPosition[i].x, botPositionX, store.coinPosition[i].y, botPositionY);
          data.push(botLengthToCoin);
          dataMin.push(botLengthToCoin[0].minCoin);
      }
      let dataMinCoin = Math.min.apply(null, dataMin);

      let found = data.find((loc) => {
          return loc[0].minCoin === dataMinCoin;
      });

      let coinPosX = parseInt(found[0].x);
      let coinPosY = parseInt(found[0].y);

      if(coinPosX < botPositionX) {
          this.move(body, -1, 0);
          if(index === 0) {
              store.setCharacterState(1, index);
          } else {
              store.setCharacterState(4, index);
          }
          store.setDirection({left: 'true', right: 'false', up: 'false', down: 'false'}, index);
      } else if(coinPosX > botPositionX) {
          this.move(body, 1, 0);
          if(index === 0) {
              store.setCharacterState(0, index);
          } else {
              store.setCharacterState(1, index);
          }
          store.setDirection({left: 'false', right: 'true', up: 'false', down: 'false'}, index);
      } else if(coinPosY < botPositionY) {
          this.move(body, 0, -1);
          store.setCharacterState(2, index);
          store.setDirection({left: 'false', right: 'false', up: 'true', down: 'false'}, index);
      } else if(coinPosY > botPositionY) {
          this.move(body, 0, 1);
          store.setCharacterState(3, index);
          store.setDirection({left: 'false', right: 'false', up: 'false', down: 'true'}, index);
      }

      store.setCharacterPosition(body.position, index);
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
                player1={(store, index, body) => this.getCommands(store, index, body)}
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
                player1={(store, index, body) => this.getCommands(store, index, body)}
                player2={(store, index, body) => this.getCommands(store, index, body)}
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
