import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import Keys from '../keys';
import { Loop, Stage, KeyListener, World } from 'react-game-kit/lib';

import Character1 from './character1';
import Character2 from './character2';
import Bot from './bot';
import Bot2 from './bot2';
import Coin from './coin';

import GameBoard from './board';
import GameStore from './stores/game-store';
import GameStoreBot1 from './stores/game-store-bot1';
import GameStoreBot2 from './stores/game-store-bot2';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.keyListener1 = new KeyListener();
    this.keyListener2 = new KeyListener();
    window.context = window.context || new AudioContext();

  }

  componentDidMount() {
    
    this.keyListener1.subscribe([
      Keys.player1.left,
      Keys.player1.right,
      Keys.player1.up,
      Keys.player1.down,
      Keys.player1.action
    ]);
    this.keyListener2.subscribe([
      Keys.player2.left,
      Keys.player2.right,
      Keys.player2.up,
      Keys.player2.down,
      Keys.player2.action
    ]);
  }

  componentWillUnmount() {
    this.keyListener1.unsubscribe();
    this.keyListener2.unsubscribe();
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

  gameModes() {
    if(this.props.mode === 'player-vs-player') {
      return (
          <div>
            <Character2
                store={GameStore}
                mode={this.props.mode}
                keys={this.keyListener2}
                index={1}
            />

            <Character1
                store={GameStore}
                mode={this.props.mode}
                keys={this.keyListener1}
                index={0}
            />

            <Coin
                store={GameStore}
                mode={this.props.mode}
                index={0}
            />

            <Coin
                store={GameStore}
                mode={this.props.mode}
                index={1}
            />

            <Coin
                store={GameStore}
                mode={this.props.mode}
                index={2}
            />
          </div>
      )
    } else if(this.props.mode === 'player-vs-bot') {
      return (
          <div>
            <Character2
                store={GameStoreBot1}
                mode={this.props.mode}
                keys={this.keyListener2}
                index={1}
            />

            <Bot
                store={GameStoreBot1}
                mode={this.props.mode}
                index={0}
            />

              <Coin
                  store={GameStoreBot1}
                  mode={this.props.mode}
                  index={2}
              />
              <Coin
                  store={GameStoreBot1}
                  mode={this.props.mode}
                  index={1}
              />
              <Coin
                  store={GameStoreBot1}
                  mode={this.props.mode}
                  index={0}
              />
          </div>
      )
    } else if(this.props.mode === 'bot-vs-bot') {
      return (
          <div>
            <Bot2
                store={GameStoreBot2}
                mode={this.props.mode}
                index={1}
            />

            <Bot
                store={GameStoreBot2}
                mode={this.props.mode}
                index={0}
            />

            <Coin
                store={GameStoreBot2}
                mode={this.props.mode}
                index={2}
            />
            <Coin
                store={GameStoreBot2}
                mode={this.props.mode}
                index={1}
            />
            <Coin
                store={GameStoreBot2}
                mode={this.props.mode}
                index={0}
            />
          </div>
      )
    }
  }

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#3a9bdc' }}>
          <World onInit={this.physicsInit} gravity={{y:0, scale:0.000000000001}}>
            <GameBoard store={GameStore} />
              <p style={{position: 'absolute', left: 0, top: 0, color: 'white', margin: 0, fontSize: 36}}>{this.props.mode}</p>
            {this.gameModes()}
          </World>
        </Stage>
      </Loop>
    );
  }

}
