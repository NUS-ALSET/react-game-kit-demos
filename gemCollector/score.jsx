import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';

@observer
export default class Grass extends Component {
	static propTypes = {
		store: PropTypes.object,
		left: PropTypes.string,
		right: PropTypes.string,
		playerId: PropTypes.number,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props) {
		super(props);
	}
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			left: this.props.left,
			right: this.props.right,
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
			fontSize: '35px',
			fontWeight: 'bold',
			color: '#fff',
		};
	}
	
	render() {
		var playerNum = this.props.playerId+1;
		return (
			<div style={this.getWrapperStyles()}>
				{'Player '+playerNum+': '+this.props.store.score[this.props.playerId]}
			</div>
		);
	}
}