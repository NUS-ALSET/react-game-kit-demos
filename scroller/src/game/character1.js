import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';

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

    if (keys.isDown(keys.LEFT)) {
      if (shouldMoveStageLeft) {
        store.setStageX(store.stageX[index] + 2, index);
      }

      this.move(body, -2, 0);
      characterState = 1;
    } else if (keys.isDown(keys.RIGHT)) {
      if (shouldMoveStageRight) {
        store.setStageX(store.stageX[index] - 2, index);
      }

      this.move(body, 2, 0);
      characterState = 0;
    } else if (keys.isDown(keys.UP)) {
      if(shouldMoveStageUp) {
        store.setStageY(store.stageY[index] + 2, index);
      }
      this.move(body, 0, -2);
      characterState = 2;
    } else if (keys.isDown(keys.DOWN)) {
      if(shouldMoveStageDown) {
        store.setStageY(store.stageY[index] - 2, index);
      }

      this.move(body, 0, 2);
      characterState = 3;
    }
 
    this.setState({
      characterState,
      repeat: characterState < 5,
    });
  };

  update() {
    const { store, index } = this.props;
    const { body } = this.body;

    const midPoint = Math.abs(store.stageX[index]) + 920;

    const shouldMoveStageLeft = body.position.x < midPoint && store.stageX[index] < 0;
    const shouldMoveStageRight =
      body.position.x > midPoint && store.stageX[index] > -2048;
    const shouldMoveStageUp = body.position.y < 576 && store.stageY[index] < 0 ;
    const shouldMoveStageDown = body.position.y >576 && store.stageY[index]>-576 ;

    if (!this.isLeaving) {
      this.checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown);

      store.setCharacterPosition(body.position, index);
    } else {
      
      const targetX = store.stageX[index] + (this.lastX - body.position.x);
      const targetY = store.stageY[index] + (this.lastY - body.position.y);
      

      if (shouldMoveStageLeft || shouldMoveStageRight) {
        store.setStageX(targetX, index);
      } else if (shouldMoveStageUp || shouldMoveStageDown) {
        store.setStageY(targetY, index);
      }
    }

    this.lastX = body.position.x;
    this.lastY = body.position.y;
    console.log("character1");
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
