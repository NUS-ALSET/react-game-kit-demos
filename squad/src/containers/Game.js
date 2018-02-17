import React, {Component} from 'react';
import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Tile from './Tile';
import gameJsonData from '../config.json';

export default class Game extends Component {
    getWrapperStyles() {
        return {
            height: '100%',
            width: '100%',
            transform: `translate(0px, 0px) translateZ(0)`,
            transformOrigin: 'top left',
            background: '#3a9bdc'
        };
    }
    render() {
        console.log(this.props.gameData);
        return <div style={{height: gameJsonData.gameHeight+'px', width: gameJsonData.gameWidth+'px', float:'left', marginLeft: '5px', marginBottom: '15px'}}>Game for: {this.props.type}
            <Loop>
                <Stage style={this.getWrapperStyles()}>
                    {this.props.gameData.tiles.map((tile, index) => {
                        return <Tile key={index}/>
                    })}
                </Stage>
            </Loop>
        </div>
    }
}