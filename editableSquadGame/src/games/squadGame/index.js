import React, {Component} from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './tile';
import Character from './character';
import Bot from './bot';

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
                    <Tile tiles={this.props.gameData.config.game1.tiles}/>
                    <Character gameId={0} charId={0} type={this.props.gameData.config.game1.character1.type}/>
                    <Character gameId={0} charId={1} type={this.props.gameData.config.game1.character2.type}/>
                </Stage></div>
                <div style={this.getGameWrapperStyles()}><Stage style={this.getGameStyles()}>
                    <Tile tiles={this.props.gameData.config.game2.tiles}/>
                    <Bot gameId={1} charId={0} type={this.props.gameData.config.game2.character1.type}/>
                    <Bot gameId={1} charId={1} type={this.props.gameData.config.game2.character2.type}/>
                </Stage></div>
            </Loop>
        </div>
    }
}