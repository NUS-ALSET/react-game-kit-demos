import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {movePlayer, updatePlayerDirection, updatePlayerSpeed, switchPlayer, generatePlayerCollectives, removePlayerCollective, incrementPlayerScore} from '../actions/index';
import { KeyListener } from 'react-game-kit';
import Gnome1 from './Characters/Gnome1';
import Blonde from './Characters/Blonde';
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
        this.checkBorderCollision = this.checkBorderCollision.bind(this);
        this.getCollectives = this.getCollectives.bind(this);
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
        else if(this.keyListener.isDown(gameJsonData.switchKey)&&this.props.gamesData.currentPlayer==this.props.gameIndex)
            this.props.switchPlayer();
        this.props.movePlayer({gameIndex: this.props.gameIndex, direction:'right'});
        if(this.props.gamesData.playerScore>=gameJsonData.amountToWin)
            this.props.updatePlayerSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(this.props.gamesData.botScore>=gameJsonData.amountToWin)
            this.props.updatePlayerSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(this.props.gamesData.gameState=="pause")
            this.props.updatePlayerSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(!this.checkBorderCollision())
            this.props.updatePlayerSpeed({gameIndex:this.props.gameIndex,speed:0});
        else
            this.props.updatePlayerSpeed({gameIndex:this.props.gameIndex,speed:gameJsonData.games[this.props.gameIndex].character.speed});
        this.props.generatePlayerCollectives({gameIndex:this.props.gameIndex});
        this.getCollectives();
    }

    getCollectives(){
        var player = document.getElementById("player"+this.props.gameIndex);
        if(!player)
            return false;
        var parentEl = player.parentElement;
        player = player.childNodes[0];
        var collectives = parentEl.getElementsByClassName('collective');
        Array.from(collectives).forEach(collective => {
                if(this.rect2Rect(collective, player)){
                    var collectiveId = collective.getAttribute("data-key");
                    this.props.incrementPlayerScore();
                    this.props.removePlayerCollective({gameIndex: this.props.gameIndex,collectiveIndex: collectiveId});
                }
            });
    }

    rect2Rect(collective, player) {
		return (
			collective.getBoundingClientRect().left <= player.getBoundingClientRect().left + player.getBoundingClientRect().width &&
			collective.getBoundingClientRect().left + collective.getBoundingClientRect().width  >= player.getBoundingClientRect().left &&
			collective.getBoundingClientRect().top + collective.getBoundingClientRect().height >= player.getBoundingClientRect().top &&
			collective.getBoundingClientRect().top <= player.getBoundingClientRect().top + player.getBoundingClientRect().height
		);
	}

    checkBorderCollision(){
        var el = document.getElementById("player"+this.props.gameIndex);
        if(!el)
            return false;
        var parentEl = el.parentElement;
        el = document.getElementById("player"+this.props.gameIndex).childNodes[0];
        
		var parentOffset = parentEl.getBoundingClientRect();
		var viewportOffset = el.getBoundingClientRect();
		var top = viewportOffset.top;
		var left = viewportOffset.left;
		var right = viewportOffset.right;
		var bottom = viewportOffset.bottom;
		var parentTop = parentOffset.top;
		var parentLeft = parentOffset.left;
		var parentRight = parentOffset.right;
        var parentBottom = parentOffset.bottom;
        var direction = this.props.playerPositions[this.props.gameIndex].direction;
		if(direction == "left")
			return left<=parentLeft?false:true;
		else if(direction == "right")
			return right>=parentRight?false:true;
		else if(direction == "up")
			return top<=parentTop?false:true;
		else if(direction == "down")
			return bottom>=parentBottom?false:true;
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
        if(this.props.playerPositions==null)
            return <div></div>
        switch(this.props.character.type){
            case 'gnome1':
                return <div id={'player'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/></div>
            case 'blonde':
                return <div id={'player'+this.props.gameIndex}><Blonde characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/></div>
            default:
                return <div id={'player'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/></div>
        }
    }
}

function mapStateToProps(state){
    return {
        playerPositions: state.playerPositions,
        gamesData: state.gamesData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({movePlayer: movePlayer, updatePlayerDirection: updatePlayerDirection,
        updatePlayerSpeed: updatePlayerSpeed, switchPlayer: switchPlayer, 
        generatePlayerCollectives: generatePlayerCollectives, removePlayerCollective: removePlayerCollective,
        incrementPlayerScore: incrementPlayerScore}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Character);