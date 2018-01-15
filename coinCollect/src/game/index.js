import React, { Component } from 'react';
import Matter from 'matter-js';
import Keys from '../keys';
import { Loop, Stage, KeyListener, World } from 'react-game-kit/lib';

import Character1 from './character1';
import Character2 from './character2';
import Bot from './bot';
import Bot2 from './bot2';
import Coin from './coin';

import GameBoard from './board';
import GameSettings from './gameSettings';
import Bar from './top-bar';
import Restart from './restart';

import GameStore from './stores/game-store';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.keyListener1 = new KeyListener();
    this.keyListener2 = new KeyListener();
    this.keySettingListener = new KeyListener();
  }
  componentWillMount() {
    const { gameStore, rounds, coinInRound } = this.props;
    if(rounds) {
      gameStore.rounds = rounds;
    }
    if(coinInRound) {
      gameStore.coinInRound = coinInRound;
    }
    this.setCoinPositions();
    this.setPlayerPosition();
  }

  componentDidMount() {
    this.keyListener1.subscribe([
      Keys.player1.left,
      Keys.player1.right,
      Keys.player1.up,
      Keys.player1.down,
      Keys.player1.action,
      Keys.player1.pause,
    ]);
    this.keyListener2.subscribe([
      Keys.player2.left,
      Keys.player2.right,
      Keys.player2.up,
      Keys.player2.down,
      Keys.player2.action,
      32,
    ]);
    if(this.props.gamePause) {
        this.keySettingListener.subscribe([
            this.props.gamePause
        ]);
    } else {
        this.keySettingListener.subscribe([
            27
        ]);
    }
  }

  componentWillUnmount() {
    this.keyListener1.unsubscribe();
    this.keyListener2.unsubscribe();
    this.keySettingListener.unsubscribe();
  }

  physicsInit(engine) {
    const ground = Matter.Bodies.rectangle(-10, 520 , 2048 * 1, 64, {
      isStatic: true,
    });

    const leftWall = Matter.Bodies.rectangle(-10, 288, 64, 576, {
      isStatic: true,
    });

    const rightWall = Matter.Bodies.rectangle(964, 288, 64, 576, {
      isStatic: true,
    });

    const topWall = Matter.Bodies.rectangle(-64, -7, 2048, 64, {
      isStatic: true,
    });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, topWall);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  };

  setCoinPositions() {
      const {coinsPosition, gameStore, coins} = this.props;
      if(coinsPosition) {
          gameStore.coinPosition = coinsPosition;
          if(coinsPosition.length !== coins.length) {
              if(coinsPosition.length < coins.length) {
                  for(let i = coinsPosition.length; i < coins.length; i++) {
                      gameStore.setCoinPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
                  }
              } else {
                  console.error('Mode: ' + this.props.mode + ' - Error, coins ' + coins.length  + ' < ' + coinsPosition.length + ' coinsPosition, you can add coin');
              }
          }
      } else {
          gameStore.coinPosition = coins.map(() => {return ({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500})});
      }
  }

  setPlayerPosition() {
      const {playersPosition, gameStore } = this.props;
      if(playersPosition) {
          gameStore.characterPosition = playersPosition;
          if(playersPosition.length !== 2) {
              for(let i = playersPosition.length; i < 2; i++) {
                  gameStore.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
              }
          }
      } else {
          for(let i = 0; i < 2; i++) {
              if(i === 0) {
                  gameStore.setCharacterPosition({x: 64, y: 64}, i);
              } else if(i === 1) {
                  gameStore.setCharacterPosition({x: 899, y: 450}, i);
              } else {
                  gameStore.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i);
              }
          }
      }
  }

  render() {
      return (
          <Loop>
              <Stage style={{ background: '#3a9bdc' }}>
                  <World onInit={this.physicsInit} gravity={{ x: 0, y: 0, scale: 0.00 }}>
                      <GameBoard store={GameStore} />
                      <GameSettings
                          store={this.props.gameStore}
                          keys={this.keySettingListener}
                          gamePause={this.props.gamePauseKey ? this.props.gamePauseKey : 27}
                          onDispatch={this.props.onDispatch}
                          gameId={this.props.gameId}
                          playersPosition={this.props.playersPosition}
                      />
                      <Bar
                          mode={this.props.mode}
                          store={this.props.gameStore}
                          coinsPosition={this.props.coinsPosition}
                          coins={this.props.coins}
                          playersPosition={this.props.playersPosition}
                          gameId={this.props.gameId}
                          handleClick={this.props.handleClick}
                      />
                      {this.props.gameState[this.props.gameId] ? this.props.gameStore.winner.length < 1 ? (
                          <div>
                              {this.props.player2 ? (
                                  <Bot2
                                      store={this.props.gameStore}
                                      mode={this.props.mode}
                                      index={1}
                                      player={this.props.player2}
                                  />
                              ) : (
                                  <Character2
                                      store={this.props.gameStore}
                                      mode={this.props.mode}
                                      keys={this.keyListener2}
                                      index={1}
                                  />
                              )}
                              {this.props.player1 ? (
                                  <Bot
                                      store={this.props.gameStore}
                                      mode={this.props.mode}
                                      index={0}
                                      player={this.props.player1}
                                  />
                              ) : (
                                  <Character1
                                      store={this.props.gameStore}
                                      mode={this.props.mode}
                                      keys={this.keyListener1}
                                      index={0}
                                  />
                              )}

                              {this.props.coins.map((index, key) => (
                                  <Coin
                                      key={key}
                                      store={this.props.gameStore}
                                      mode={this.props.mode}
                                      index={key}
                                  />
                              ))}
                          </div>
                      ) : [] : (
                          <Restart gameId={this.props.gameId} handleClick={this.props.handleClick} />
                      ) }
                  </World>
              </Stage>
          </Loop>
      )
  }

}
