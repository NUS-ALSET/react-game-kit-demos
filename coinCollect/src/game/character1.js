import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';
import Keys from '../keys';

@observer
export default class Character1 extends Component {
  static propTypes = {
    keys: PropTypes.object,
    store: PropTypes.object,
    index: PropTypes.number,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    
    
    this.state = {
      characterState: 5,
      loop: false,
      spritePlaying: true,
    };

    this.handlePlayStateChanged = this.handlePlayStateChanged.bind(this);
    this.checkKeys = this.checkKeys.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { characterPosition, stageX, stageY } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition[this.props.index];
    const targetX = x + stageX[this.props.index];
    const targetY = y + stageY[this.props.index];

    return {
      width: 100,
      height: 100,
      position: 'absolute',
      transform: `translate(${targetX * scale}px, ${targetY * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  handlePlayStateChanged() {
    this.setState({
      spritePlaying: false,
    });
  };

  move(body, x, y) {
    Matter.Body.setVelocity(body, { x, y });
  };

  checkKeys() {
    const { keys, store, index } = this.props;
    const { body } = this.body;

    let characterState = 4;
    store.setDirection({left: 'false', right: 'false', up: 'false', down: 'false'}, index);
    let speed = 2;
    if(this.props.mode !== 'player-vs-player') {
      speed = 1;
    }

    if (keys.isDown(Keys.player1.left)) {
      this.move(body, -speed, 0);
      characterState = 1;
      store.setDirection({left: 'true', right: 'false', up: 'false', down: 'false'}, index);

    } else if (keys.isDown(Keys.player1.right)) {
      this.move(body, speed, 0);
      characterState = 0;
      store.setDirection({left: 'false', right: 'true', up: 'false', down: 'false'}, index);
    } else if (keys.isDown(Keys.player1.up)) {
      this.move(body, 0, -speed);
      characterState = 2;
      store.setDirection({left: 'false', right: 'false', up: 'true', down: 'false'}, index);
    } else if (keys.isDown(Keys.player1.down)) {
      this.move(body, 0, speed);
      characterState = 3;
      store.setDirection({left: 'false', right: 'false', up: 'false', down: 'true'}, index);
    }
 
    this.setState({
      characterState,
      repeat: characterState < 5,
    });
  };

  update() {
    const { store, index } = this.props;
    const { body } = this.body;

    if (store.game) {
      this.checkKeys();
    }
    store.setCharacterPosition(body.position, index);
  };

  render() {
    const x = this.props.store.characterPosition[this.props.index].x;
    const y = this.props.store.characterPosition[this.props.index].y;

    return (
      <div id={this.props.mode + "-player1"} style={this.getWrapperStyles()}>
        <Body
          args={[x, y, 64, 64]}
          inertia={Infinity}
          ref={b => {
            this.body = b;
          }}
        >
          <Sprite
            repeat={this.state.repeat}
            onPlayStateChanged={this.handlePlayStateChanged}
            src="assets/character1.png"
            scale={this.context.scale}
            state={this.state.characterState}
            steps={[7, 7, 7, 7, 0, 0]}
          />
        </Body>
      </div>
    );
  }
 
}
