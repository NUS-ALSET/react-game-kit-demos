import React, {Component} from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';

export default class SquadGame extends Component {
    getWrapperStyles() {
        return {
            height: '95vh',
            width: '100%',
            transform: `translate(0px, 0px) translateZ(0)`,
            transformOrigin: 'top left'
        };
    }
    getGameWrapperStyles() {
        return {
            height: '100%',
            width: '50%',
            float: 'left',
            transform: `translate(0px, 0px) translateZ(0)`,
            transformOrigin: 'top left'
        };
    }
    getGameStyles() {
        return {
            height: '80%',
            width: '100%',
            float: 'left',
            transform: `translate(0px, 10%) translateZ(0)`,
            transformOrigin: 'top left',
            background: '#3a9bdc'
        };
    }
    render(){
        return <div style={this.getWrapperStyles()}>
            <Loop>
                <div style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
                    <Tile tiles={this.props.data.confg.game1.tiles}/>
                </Stage></div>
                <div style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
                    <Tile tiles={this.props.data.confg.game2.tiles}/>
                </Stage></div>
            </Loop>
        </div>
    }
}