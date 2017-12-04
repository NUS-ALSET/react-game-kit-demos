import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import { Loop, Stage, KeyListener, World } from 'react-game-kit/lib';

import Character from './character';
import GameBoard from './board';


import GameStore from './stores/game-store';

export default class Game extends Component {

  componentDidMount() {
    
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      65,
    ]);
  }

  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#3a9bdc' }}>
          <World onInit={this.physicsInit}>
            <GameBoard store={GameStore} />
            <Character
              store={GameStore}
              keys={this.keyListener}
            />
          </World>
        </Stage>
      </Loop>
    );
  }

  physicsInit(engine) {
    const ground = Matter.Bodies.rectangle(512, 448, 1024 * 1, 64, {
      isStatic: true,
    });

    const leftWall = Matter.Bodies.rectangle(-64, 288, 64, 576, {
      isStatic: true,
    });

    const rightWall = Matter.Bodies.rectangle(512, 288, 64, 576, {
      isStatic: true,
    });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  };


  constructor(props) {
    super(props);

    this.keyListener = new KeyListener();
    window.context = window.context || new AudioContext();

  }
}
