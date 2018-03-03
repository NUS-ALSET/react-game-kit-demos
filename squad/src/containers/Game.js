import React, {Component} from 'react';
import { Loop, Stage } from 'react-game-kit';
import Tile from './Tile';
import Obstacle from './Obstacle';
import CharacterPlayer from './CharacterPlayer';
import CharacterBot from './CharacterBot';
import Collectives from './Collectives';
import gameJsonData from '../config.json';
import {connect} from 'react-redux';

class Game extends Component {
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
        return <div id={this.props.type+'-game-'+this.props.index} style={{height: gameJsonData.gameHeight+'px', width: gameJsonData.gameWidth+'px', float:'left', marginLeft: '5px', marginBottom: '15px'}}>
            <h4 style={
                this.props.index==this.props.gamesData.currentPlayer&&this.props.type=='player'?
                {'margin':0,'color':'#fff', background:'green', textAlign:'center'}:
                {'margin':0, textAlign:'center'}
            }>{this.props.type=='player'?'Player '+(this.props.index+1):'Bot '+(this.props.index+1)}</h4>
            <Loop>
                <Stage style={this.getWrapperStyles()}>
                    {this.props.gameData.tiles.map((tile, index) => {
                        return <Tile key={index} tile={tile} />
                    })}
                    {this.props.gameData.obstacles.map((obstacle, index) => {
                        return <Obstacle key={index} obstacle={obstacle}/>
                    })}
                    {this.props.type=='player'?
                        <CharacterPlayer character={this.props.gameData.character} gameIndex={this.props.index} gameType={this.props.type}/>:
                        <CharacterBot script={this.props.script} character={this.props.gameData.character} gameIndex={this.props.index} gameType={this.props.type}/>
                    }
                    <Collectives gameIndex={this.props.index} gameType={this.props.type} collectivesData={gameJsonData.collectedObjects}/>
                </Stage>
            </Loop>
        </div>
    }
}

function mapStateToProps(state){
    return {
        gamesData: state.gamesData
    };
}

export default connect(mapStateToProps)(Game);