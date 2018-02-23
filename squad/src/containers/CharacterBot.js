import React, {Component} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {movePlayer, moveBot, updateBotDirection, updateBotSpeed} from '../actions/index';

import Character1 from './Characters/Character1';

class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
	constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
    }
    
    loop = () => {
        this.props.moveBot({gameIndex: this.props.gameIndex, direction:'down'});

    }

    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
	
	render() {
        if(this.props.playerPositions==null||this.props.botPositions==null)
            return <div></div>
        switch(this.props.character.type){
            case 'character1':
                return <Character1 characterData={this.props.character} positionData={this.props.botPositions[this.props.gameIndex]}/>
            default:
                return <Character1 characterData={this.props.character} positionData={this.props.playerPositions[this.props.gameIndex]}/>
        }
    }
}

function mapStateToProps(state){
    return {
        playerPositions: state.playerPositions,
        botPositions: state.botPositions, 
        updateBotDirection: updateBotDirection,
        updateBotSpeed: updateBotSpeed,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({movePlayer: movePlayer, moveBot: moveBot}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Character);