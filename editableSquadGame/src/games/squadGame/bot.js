import React, {Component} from 'react';
import PropTypes from "prop-types";
import { KeyListener } from 'react-game-kit';
import Gnome1 from '../../selectable/Characters/Gnome1';
import Gnome2 from '../../selectable/Characters/Gnome2';
import Blonde from '../../selectable/Characters/Blonde';
import Brunette from '../../selectable/Characters/Brunette';
import Store from '../../store/squad';

export default class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
    }
    loop = () => {
        Store.moveCharacter(this.props.gameId, this.props.charId)
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        switch(this.props.type){
            case 'gnome1':
                return <div id={'bt'+this.props.charId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'gnome2':
                return <div id={'bt'+this.props.charId}>
                    <Gnome2 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'blonde':
                return <div id={'bt'+this.props.charId}>
                    <Blonde 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'brunette':
                return <div id={'bt'+this.props.charId}>
                    <Brunette 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}
                    />
                </div>
            default:
                return <div id={'bt'+this.props.charId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
        }
    }
}