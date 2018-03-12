import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

import Grass from '../../selectable/Tiles/Grass';
import Sand from '../../selectable/Tiles/Sand';
import Concrete from '../../selectable/Tiles/Сoncrete';

export default class Tile extends Component {
	render() {
        this.props.tiles.map((tile, index)=>{
            switch(tile.type){
                case 'grass':
                    return <Grass tileData={tile}/>
                case 'concrete':
                    return <Concrete tileData={tile}/>
                case 'sand':
                    return <Sand tileData={tile}/>
                default:
                    return <Grass tileData={tile}/>
            }
        })
    }
}