import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun } from 'mobx';

import { TileMap } from 'react-game-kit/lib';
import GameStore from './stores/game-store';

export default class board extends Component {
  static contextTypes = {
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      stageX: 0,
    };
  }

  componentDidMount() {
    this.cameraWatcher = autorun(() => {
      const targetX = Math.round(GameStore.stageX * this.context.scale);
      this.setState({
        stageX: targetX,
      });
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const targetX = Math.round(GameStore.stageX * nextContext.scale);
    this.setState({
      stageX: targetX,
    });
  }

  componentWillUnmount() {
    this.cameraWatcher();
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: `translate(${this.state.stageX}px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: Math.floor(-63 * this.context.scale) }}
          src="assets/background.png"
          rows={1}
          columns={3}
          tileSize={512}
          layers={[[1, 2, 3]]}
        />
      </div>
    );
  }
}
