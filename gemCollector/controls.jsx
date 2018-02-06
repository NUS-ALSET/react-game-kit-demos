import React, {Component} from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';

@observer
export default class Grass extends Component {
	static propTypes = {
		store: PropTypes.object,
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
			bottom: "10px",
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
			fontSize: '20px',
			fontWeight: 'bold',
			color: '#fff',
		};
	}
	
	getControlStyles() {
		return {
			display:"inline",
			border: '1px solid',
			borderRadius: '10px',
			textAlign: 'center',
			cursor: 'pointer',
			marginLeft: '10px',
			textTransform:'uppercase',
			padding:'5px'
		};
	}
	
	render() {
		return (
			<div style={this.getWrapperStyles()}>
				<div onClick={()=>{
						this.props.store.mode = "restart";
						this.props.store.score = [0,0];
						setTimeout(()=>{
							this.props.store.mode = "play";
						},1000);
					}
				} style={this.getControlStyles()}>{"restart"}</div>
				{this.props.store.mode=="play"?(
					<div onClick={()=>{this.props.store.mode = "pause"}} style={this.getControlStyles()}>{"pause"}</div>
				):(
					<div onClick={()=>{this.props.store.mode = "play"}} style={this.getControlStyles()}>{"resume"}</div>
				)}
			</div>
		);
	}
}