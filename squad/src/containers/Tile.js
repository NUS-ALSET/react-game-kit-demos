import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

import Grass from './Tiles/Grass';
import Sand from './Tiles/Sand';
import Concrete from './Tiles/Сoncrete';

export default class Tile extends Component {
	constructor(props) {
		super(props);
	}
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}
	
	render() {
        switch(this.props.tile.type){
            case 'grass':
                return <Grass tileData={this.props.tile}/>
            case 'concrete':
                return <Concrete tileData={this.props.tile}/>
            case 'sand':
                return <Sand tileData={this.props.tile}/>
            default:
                return <Grass tileData={this.props.tile}/>
        }
    }
}