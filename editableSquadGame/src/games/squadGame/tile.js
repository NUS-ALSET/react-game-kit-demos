import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';

import Grass from '../../selectable/Tiles/Grass';
import Sand from '../../selectable/Tiles/Sand';
import Concrete from '../../selectable/Tiles/Concrete';
import Building from '../../selectable/Tiles/Building';
import RoadCross from '../../selectable/Tiles/RoadCross';
import RoadLeftRight from '../../selectable/Tiles/RoadLeftRight';
import RoadUpDown from '../../selectable/Tiles/RoadUpDown';
import Roof from '../../selectable/Tiles/Roof';

export default class Tile extends Component {
	render() {
        return <div>{
            this.props.tiles.map((tile, index)=>{
                switch(tile.type){
                    case 'grass':
                        return <Grass key={index} tileData={tile}/>
                    case 'concrete':
                        return <Concrete key={index} tileData={tile}/>
                    case 'sand':
                        return <Sand key={index} tileData={tile}/>
                    case 'building':
                        return <Building key={index} tileData={tile}/>
                    case 'roadCross':
                        return <RoadCross key={index} tileData={tile}/>
                    case 'roadLeftRight':
                        return <RoadLeftRight key={index} tileData={tile}/>
                    case 'roadUpDown':
                        return <RoadUpDown key={index} tileData={tile}/>
                    case 'roof':
                        return <Roof key={index} tileData={tile}/>
                    default:
                        return <Grass key={index} tileData={tile}/>
                }
            })
        }</div>
    }
}