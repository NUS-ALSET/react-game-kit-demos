import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';
import Pos from './pos';

import { Body, Sprite } from 'react-game-kit/lib';

@observer
export default class Bot extends Component {
  static propTypes = {
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

  handlePlayStateChanged(state) {
    this.setState({
      spritePlaying: state ? true : false,
    });
  };

  move(body, x, y) {
    Matter.Body.setVelocity(body, { x, y });
  };

  checkKeys() {
    const { store } = this.props;
    const { body } = this.body;

    let characterState = 4;

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

    if (coinPosX < botPositionX) {
      this.move(body, -1, 0);
      characterState = 1;
    } else if(coinPosX > botPositionX) {
      this.move(body, 1, 0);
      characterState = 0;
    } else if(coinPosY < botPositionY) {
      this.move(body, 0, -1);
      characterState = 2;
    } else if(coinPosY > botPositionY) {
      this.move(body, 0, 1);
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
    const shouldMoveStageRight = body.position.x > midPoint && store.stageX[index] > -2048;
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
  };

  render() {
    const x = this.props.store.characterPosition[this.props.index].x;
    const y = this.props.store.characterPosition[this.props.index].y;

    return (
      <div id={this.props.mode + '-player1'} style={this.getWrapperStyles()}>
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
          <Pos value={this.props.store.playersScore[this.props.index].score} />
        </Body>
      </div>
    );
  }
 
}
