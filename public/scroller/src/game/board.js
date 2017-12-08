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
  
  }

  componentDidMount() {
   
  }

  componentWillReceiveProps(nextProps, nextContext) {
   
  }

  componentWillUnmount() {
    
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: `translate(0px, 0px) translateZ(0)`,
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
