import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

export default class Houses extends Component {
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
          src="assets/buildings.png"
          tileSize={145}
          columns={6}
          rows={3}
          layers={[
            [
			  0,0,0,0,0,0,
              1,2,3,4,5,6,
			  0,0,0,0,0,0,
            ],
          ]}
        />
  </div>)}
}