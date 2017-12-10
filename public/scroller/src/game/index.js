import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import { Loop, Stage, KeyListener, World } from 'react-game-kit/lib';


import Character from './character';
import Character1 from './character1';
import Character2 from './character2';


import GameBoard from './board';


import GameStore from './stores/game-store';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.keyListener1 = new KeyListener();
    this.keyListener2 = new KeyListener();
    window.context = window.context || new AudioContext();

  }

  componentDidMount() {
    
    this.keyListener1.subscribe([
      this.keyListener1.LEFT,
      this.keyListener1.RIGHT,
      this.keyListener1.UP,
      this.keyListener1.DOWN,
      65,
    ]);
    this.keyListener2.subscribe([
      73,
      74,
      75,
      76,
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

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#3a9bdc' }}>
          <World onInit={this.physicsInit} gravity={{y:0, scale:0.000000000001}}>
            <GameBoard store={GameStore} />
            
            <Character2
              store={GameStore}
              keys={this.keyListener2}
              index={1}
            />
            
            <Character1
              store={GameStore}
              keys={this.keyListener1}
              index={0}
            />
            
            
          </World>
        </Stage>
      </Loop>
    );
  }

  
}
