import React, {Component} from 'react';

import Coin from './Collectives/Coin';
import Gem from './Collectives/Gem';
import {connect} from 'react-redux';

class Collectives extends Component {
    constructor(){
        super();
    }
    render() {
        const collectives = this.props.gameType=='player'?this.props.playerCollectives:this.props.botCollectives;
        if(collectives[this.props.gameIndex]==undefined)
            return <div></div>;
        switch(this.props.collectivesData.type){
            case 'coin':
                return  <div>{collectives[this.props.gameIndex].map((collective, index) => {
                    return <Coin key = {index} collectiveData = {collective} index = {index}/>;
                })}</div>
            case 'gem':
                return  <div>{collectives[this.props.gameIndex].map((collective, index) => {
                    return <Gem key = {index} collectiveData = {collective} index = {index}/>;
                })}</div>
            default:
                return  <div>{collectives[this.props.gameIndex].map((collective, index) => {
                    return <Coin key = {index} collectiveData = {collective} index = {index}/>;
                })}</div>
        }
    }
}

function mapStateToProps(state){
    return {
        playerCollectives: state.playerCollectives,
        botCollectives: state.botCollectives
    };
}

export default connect(mapStateToProps)(Collectives);