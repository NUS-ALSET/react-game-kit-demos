import React, {Component} from 'react';
import { TileMap, Body } from 'react-game-kit';
import PropTypes from "prop-types";
import Matter from 'matter-js';

export default class Stone extends Component {
	static propTypes = {
		store: PropTypes.object,
		index: PropTypes.number,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
	}
	
	update() {
		var player1 = document.getElementById("character-0-"+this.props.gameId).childNodes[0];
		var player2 = document.getElementById("character-1-"+this.props.gameId).childNodes[0];
		var gem = document.getElementById("stoneGem-"+this.props.index+"-"+this.props.gameId);
		if(player1&&player2&&gem){
			if(this.props.store.rect2Rect(gem, player1)){
				this.props.store.removeHittenGem(this.props.index, 0);
			}
			else if(this.props.store.rect2Rect(gem, player2)){
				this.props.store.removeHittenGem(this.props.index, 1);
			}
		}
	}
	
	componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			transform: 'translate('+this.props.store.stonesData[this.props.index].x*this.context.scale+'px, '+this.props.store.stonesData[this.props.index].y*this.context.scale+'px) translateZ(0)',
			transformOrigin: 'top left',
			width:64*this.context.scale+"px",
			height:64*this.context.scale+"px",
		};
	}
	
	render() {
		
    return (
		<div id={"stoneGem-"+this.props.index+"-"+this.props.gameId} data-id={this.props.index} style={this.getWrapperStyles()}>
			<TileMap
			  style={{ top: 0, left:0 }}
			  src={"assets/gem.png"}
			  rows={1}
			  columns={1}
			  tileSize={64}
			  layers={[[1]]}
			/>
		</div>
    );
  }
}