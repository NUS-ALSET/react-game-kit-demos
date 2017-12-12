import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

export default class Background extends Component {
	constructor(props) {
		super(props);
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
          style={{ top: 0 }}
          src="assets/boardwalktile.png"
          tileSize={145}
          columns={4}
          rows={4}
          layers={[
            [
              0,0,0,0,
			  0,0,0,0,
			  1,1,1,1,
			  1,1,1,1
            ],
          ]}
        />
  </div>)}
}