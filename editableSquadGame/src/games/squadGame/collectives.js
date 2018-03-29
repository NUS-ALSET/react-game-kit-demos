import React, {Component} from 'react';
import PropTypes from "prop-types";
import Store from '../../store/squad';
import Coin from '../../selectable/Collectives/Coin';
import Gem from '../../selectable/Collectives/Gem';
import { observer } from 'mobx-react';

@observer
export default class Collectives extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
    constructor(){
        super();
    }
    loop = () => {
        Store.generateCollectives(this.props.gameId,this.props.min, this.props.max, this.props.size);
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        switch(this.props.type){
            case 'coin':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Coin key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'gem':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Gem key={index} collectiveData={collective} index={index}/>;
                })}</div>
            default:
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Coin key={index} collectiveData={collective} index={index}/>;
                })}</div>
        }
    }
}