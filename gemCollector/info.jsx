import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';

@observer
export default class Grass extends Component {
	static propTypes = {
		gameId: PropTypes.number,
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
			left: '35%',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
			fontSize: '35px',
			fontWeight: 'bold',
			color: '#fff',
		};
	}
	
	render() {
		var textInfo = "";
		if(this.props.gameId==0) textInfo = "Player vs Player";
		else if(this.props.gameId==1) textInfo = "Player vs Bot";
		else if(this.props.gameId==2) textInfo = "Bot vs Bot";
		else textInfo = "Bot vs Custom";
		return (
			<div style={this.getWrapperStyles()}>
				{textInfo}
			</div>
		);
	}
}