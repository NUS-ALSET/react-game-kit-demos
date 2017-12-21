import React, {Component} from 'react';
import { TileMap, Body } from 'react-game-kit';
import PropTypes from "prop-types";

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
	}
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			transform: 'translate('+this.props.store.stonesData[this.props.index].x+'px, '+this.props.store.stonesData[this.props.index].y+'px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}
	
	render() {
		
    return (
		<div style={this.getWrapperStyles()}>
			<Body
				args={[this.props.store.stonesData[this.props.index].x, 
				this.props.store.stonesData[this.props.index].y, 70, 70]}
				inertia={Infinity}
				isStatic={true}
				label={"stone"}
				id={this.props.index}
				customId={this.props.index}
				ref={b => {
					this.body2 = b;
				}}
			>
			<TileMap
			  style={{ top: 0, left:0 }}
			  src={"assets/gem.png"}
			  rows={1}
			  columns={1}
			  tileSize={64}
			  layers={[[1]]}
			/>
			</Body>
		</div>
    );
  }
}