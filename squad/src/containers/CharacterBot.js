import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moveBot, updateBotDirection, updateBotSpeed, generateBotCollectives, removeBotCollective, incrementBotScore} from '../actions/index';
import gameJsonData from '../config.json';
import Gnome1 from './Characters/Gnome1';
import Blonde from './Characters/Blonde';

class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
	constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.checkBorderCollision = this.checkBorderCollision.bind(this);
        this.getCollectives = this.getCollectives.bind(this);
    }
    
    loop = () => {
        if(this.props.botPositions&&this.props.botCollectives.length){
            var direction=this.props.script({collectives:this.props.botCollectives[this.props.gameIndex],player:this.props.botPositions[this.props.gameIndex]});
            //console.log(direction);
            if(!direction)
                this.props.updateBotDirection({gameIndex: this.props.gameIndex, direction:'left'});
            else if(direction.left)
                this.props.updateBotDirection({gameIndex: this.props.gameIndex, direction:'left'});
            else if(direction.right)
                this.props.updateBotDirection({gameIndex: this.props.gameIndex, direction:'right'});
            else if(direction.up)
                this.props.updateBotDirection({gameIndex: this.props.gameIndex, direction:'up'});
            else if(direction.down)
                this.props.updateBotDirection({gameIndex: this.props.gameIndex, direction:'down'});
        }
        this.props.moveBot({gameIndex: this.props.gameIndex, direction:'down'});
        if(this.props.gamesData.playerScore>=gameJsonData.amountToWin)
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(this.props.gamesData.botScore>=gameJsonData.amountToWin)
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(this.props.gamesData.gameState=="pause")
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:0});
        else if(!this.checkBorderCollision())
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:0});
        else
            this.props.updateBotSpeed({gameIndex:this.props.gameIndex,speed:gameJsonData.games[this.props.gameIndex].character.speed});
        this.props.generateBotCollectives({gameIndex:this.props.gameIndex});
        this.getCollectives();
    }

    getCollectives(){
        var player = document.getElementById("bot"+this.props.gameIndex);
        if(!player)
            return false;
        var parentEl = player.parentElement;
        player = player.childNodes[0];
        var collectives = parentEl.getElementsByClassName('collective');
        Array.from(collectives).forEach(collective => {
                if(this.rect2Rect(collective, player)){
                    var collectiveId = collective.getAttribute("data-key");
                    this.props.incrementBotScore();
                    this.props.removeBotCollective({gameIndex: this.props.gameIndex,collectiveIndex: collectiveId});
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
        var el = document.getElementById("bot"+this.props.gameIndex);
        if(!el)
            return false;
        var parentEl = el.parentElement;
        el = document.getElementById("bot"+this.props.gameIndex).childNodes[0];
        
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
        var direction = this.props.botPositions[this.props.gameIndex].direction;
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
    }
    
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
	
	render() {
        if(this.props.botPositions==null)
            return <div></div>
        switch(this.props.character.type){
            case 'gnome1':
                return <div id={'bot'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
            case 'blonde':
                return <div id={'bot'+this.props.gameIndex}><Blonde type={'bot'} characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
            default:
                return <div id={'bot'+this.props.gameIndex}><Gnome1 characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/></div>
        }
    }
}

function mapStateToProps(state){
    return {
        botPositions: state.botPositions,
        gamesData: state.gamesData,
        botCollectives: state.botCollectives
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateBotSpeed:updateBotSpeed, moveBot: moveBot,
        generateBotCollectives: generateBotCollectives,
        removeBotCollective: removeBotCollective, incrementBotScore: incrementBotScore,
        updateBotDirection: updateBotDirection
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Character);