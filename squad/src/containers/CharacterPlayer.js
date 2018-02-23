import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {movePlayer, moveBot, updatePlayerDirection, updatePlayerSpeed, switchPlayer} from '../actions/index';
import { KeyListener } from 'react-game-kit';
import Character1 from './Characters/Character1';
import gameJsonData from '../config.json';

class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
	constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.keyListener = new KeyListener();
    }
    
    loop = () => {
        if(this.keyListener.isDown(gameJsonData.controls.left)&&this.props.gamesData.currentPlayer==this.props.gameIndex)
            this.props.updatePlayerDirection({gameIndex: this.props.gameIndex, direction:'left'});
        else if(this.keyListener.isDown(gameJsonData.controls.right)&&this.props.gamesData.currentPlayer==this.props.gameIndex)
            this.props.updatePlayerDirection({gameIndex: this.props.gameIndex, direction:'right'});
        else if(this.keyListener.isDown(gameJsonData.controls.up)&&this.props.gamesData.currentPlayer==this.props.gameIndex)
            this.props.updatePlayerDirection({gameIndex: this.props.gameIndex, direction:'up'});
        else if(this.keyListener.isDown(gameJsonData.controls.down)&&this.props.gamesData.currentPlayer==this.props.gameIndex)
            this.props.updatePlayerDirection({gameIndex: this.props.gameIndex, direction:'down'});
        else if(this.keyListener.isDown(gameJsonData.switchKey)&&this.props.gamesData.currentPlayer==this.props.gameIndex){
            this.props.switchPlayer();}
        this.props.movePlayer({gameIndex: this.props.gameIndex, direction:'right'});
    }

    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
        this.keyListener.subscribe([
            gameJsonData.controls.left,
            gameJsonData.controls.right,
            gameJsonData.controls.up,
            gameJsonData.controls.down,
            gameJsonData.switchKey
        ]);
    }
    
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
        this.keyListener.unsubscribe();
    }
	
	render() {
        if(this.props.playerPositions==null||this.props.botPositions==null)
            return <div></div>
        switch(this.props.character.type){
            case 'character1':
                return <Character1 characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/>
            default:
                return <Character1 characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/>
        }
    }
}

function mapStateToProps(state){
    return {
        playerPositions: state.playerPositions,
        botPositions: state.botPositions,
        gamesData: state.gamesData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({movePlayer: movePlayer, moveBot: moveBot, updatePlayerDirection: updatePlayerDirection,
        updatePlayerSpeed: updatePlayerSpeed, switchPlayer: switchPlayer}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Character);