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
    this.lastY = 0;

    this.state = {
      characterState: 4,
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
      position: 'absolute',
      transform: `translate(${targetX * scale}px, ${targetY * scale}px)`,
      transformOrigin: 'left top',
    };
  }

   handlePlayStateChanged(state) {
    this.setState({
      spritePlaying: state ? true : false,
    });
  };

  move(body, x, y) {
    Matter.Body.setVelocity(body, { x, y });
  };

  checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown) {
    const { keys, store, index } = this.props;
    const { body } = this.body;

    let characterState = 4;

    if (keys.isDown(74)) {
      if (shouldMoveStageLeft) {
        store.setStageX(store.stageX[index] + 2, index);
      }

      this.move(body, -2, 0);
      characterState = 0;

    } else if (keys.isDown(76)) {
      if (shouldMoveStageRight) {
        store.setStageX(store.stageX[index] - 2, index);
      }

      this.move(body, 2, 0);
      characterState = 1;
    } else if (keys.isDown(73)) {
      if (shouldMoveStageUp) {
        store.setStageY(store.stageY[index] + 2, index);
      }

      this.move(body, 0, -2);
      characterState = 2;
    } else if (keys.isDown(75)) {
      if (shouldMoveStageDown) {
        store.setStageY(store.stageY[index] - 2, index);
      }

      this.move(body, 0, 2);
      characterState = 3;
    }

    this.setState({
      characterState,
      repeat: characterState < 4,
    });
  };

  update() {
    const { store, index } = this.props;
    const { body } = this.body;

    const midPointX = Math.abs(store.stageX[index]) + 920;
    const midPointY = Math.abs(store.stageY[index]) + 576;

    const shouldMoveStageLeft = body.position.x < midPointX && store.stageX[index] < 0;
    const shouldMoveStageRight =
      body.position.x > midPointX && store.stageX[index] > -2048;

    const shouldMoveStageUp = body.position.y < midPointY && store.stageY[index] < 0;
    const shouldMoveStageDown = body.position.y > midPointY && store.stageY[index] > -756;

    const velY = parseFloat(body.velocity.y.toFixed(10));

    if (velY === 0) {
      this.isJumping = false;
      Matter.Body.set(body, 'friction', 0.9999);
    }

    if (!this.isLeaving) {
      this.checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown);

      store.setCharacterPosition(body.position, index);
    } else {
      
      const targetX = store.stageX[index] + (this.lastX - body.position.x);
      const targetY = store.stageY[index] + (this.lastY - body.position.y);
      
      if (shouldMoveStageLeft || shouldMoveStageRight) {
        store.setStageX(targetX, index);
      } else if (shouldMoveStageUp || shouldMoveStageDown) {
        store.setStageY(targetY,  index);
      }
    }

   this.lastX = body.position.x;
   this.lastY = body.position.y;

   console.log("character2");
   console.log(this.lastX, this.lastY);
  };

  render() {
    const x = this.props.store.characterPosition[this.props.index].x;
    const y = this.props.store.characterPosition[this.props.index].y;

    return (
      <div style={this.getWrapperStyles()}>
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
            src="assets/character2.png"
            scale={this.context.scale}
            state={this.state.characterState}
            steps={[7, 7, 7, 7, 0]}
          />
        </Body>
      </div>
    );
  }
 
}
