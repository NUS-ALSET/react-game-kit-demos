import React, {Componenet, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fillPlayerData, fillBotData} from '../actions/index';
import gameJsonData from '../config.json';
import Game from './Game';

class GamesContainer extends Component{
    constructor(){
        super();
        this.state = {
            currentPlayer: 0
        }
    }
    componentDidMount(){
        if(this.props.type=="player"){
            gameJsonData.games.forEach((element,index) => {
                if(element['same-as']!==undefined)
                    gameJsonData.games[index] = gameJsonData.games[element['same-as']];
            });
            this.props.fillPlayerData(gameJsonData.games);
            this.props.fillBotData(gameJsonData.games);
        }
    }
    render(){
        return <div style={{width: '100%'}}>
            <h1>{this.props.type=="player"?"Player score: "+this.props.gamesData.playerScore:"Bot score: "+this.props.gamesData.botScore}</h1>
            {this.props.type=="player"?"fds":"xzl"&&<div><button>{"Pause"}</button></div>}
            {this.props.playerGames.map((game, index) => {
                if(this.props.type=="player")
                    return <Game key={index} index={index} type={this.props.type} gameData={game}/>
                else
                    return <Game key={index} index={index} type={this.props.type} gameData={game}/>
            })}
            <div style={{clear:"both"}}></div>
        </div>
    }
}

function mapStateToProps(state){
    return {
        botGames: state.botGames,
        playerGames: state.playerGames,
        gamesData: state.gamesData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fillPlayerData: fillPlayerData,
        fillBotData: fillBotData
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GamesContainer);