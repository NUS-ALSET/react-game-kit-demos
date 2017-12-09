import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';

@observer
export default class Character2 extends Component {
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
    this.isLeaving = false;
    this.lastX = 0;

    this.state = {
      characterState: 2,
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
    const { characterPosition, stageX } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition[this.props.index];
    const targetX = x + stageX[this.props.index];

    return {
      position: 'absolute',
      transform: `translate(${targetX * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    };
  }

   handlePlayStateChanged(state) {
    this.setState({
      spritePlaying: state ? true : false,
    });
  };

  move(body, x) {
    Matter.Body.setVelocity(body, { x, y: 0 });
  };

  checkKeys(shouldMoveStageLeft, shouldMoveStageRight) {
    const { keys, store, index } = this.props;
    const { body } = this.body;

    let characterState = 3;

    if (keys.isDown(74)) {
      if (shouldMoveStageLeft) {
        store.setStageX(store.stageX[index] + 5, index);
      }

      this.move(body, -5);
      characterState = 1;

    } else if (keys.isDown(76)) {
      if (shouldMoveStageRight) {
        store.setStageX(store.stageX[index] - 5, index);
      }

      this.move(body, 5);
      characterState = 0;
    }

    this.setState({
      characterState,
      repeat: characterState < 2,
    });
  };

  update() {
    const { store, index } = this.props;
    const { body } = this.body;

    const midPoint = Math.abs(store.stageX[index]) + 920;

    const shouldMoveStageLeft = body.position.x < midPoint && store.stageX[index] < 0;
    const shouldMoveStageRight =
      body.position.x > midPoint && store.stageX[index] > -2048;

    const velY = parseFloat(body.velocity.y.toFixed(10));

    if (velY === 0) {
      this.isJumping = false;
      Matter.Body.set(body, 'friction', 0.9999);
    }

    if (!this.isLeaving) {
      this.checkKeys(shouldMoveStageLeft, shouldMoveStageRight);

      store.setCharacterPosition(body.position, index);
    } else {
      
      const targetX = store.stageX[index] + (this.lastX - body.position.x);
      if (shouldMoveStageLeft || shouldMoveStageRight) {
        store.setStageX(targetX, index);
      }
    }

   this.lastX = body.position.x;
   console.log("character2");
   console.log(this.lastX);
  };

  render() {
    const x = this.props.store.characterPosition[this.props.index].x;

    return (
      <div style={this.getWrapperStyles()}>
        <Body
          args={[x, 384, 64, 64]}
          inertia={Infinity}
          ref={b => {
            this.body = b;
          }}
        >
          <Sprite
            repeat={this.state.repeat}
            onPlayStateChanged={this.handlePlayStateChanged}
            src="assets/character2-sprite.png"
            scale={this.context.scale * 2}
            state={this.state.characterState}
            steps={[9, 9, 0, 0, 0]}
          />
        </Body>
      </div>
    );
  }
 
}
