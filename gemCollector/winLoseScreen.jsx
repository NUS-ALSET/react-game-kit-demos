import React, {Component} from 'react';
import PropTypes from "prop-types";
import Matter from 'matter-js';
import { observer } from 'mobx-react';

@observer
export default class WinLoseScreen extends Component {
	static propTypes = {
		store: PropTypes.object,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props) {
		super(props);
		this.winText = "";
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
		this.update = this.update.bind(this);
		this.gatherToWin = this.props.store.config.gatherToWin;
	}

	update(){
		if(this.props.store.score[0]>=this.gatherToWin||this.props.store.score[1]>=this.gatherToWin){
			this.props.store.mode = "pause";
		}
	}

	componentDidMount() {
		Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
	}

	componentWillUnmount() {
		Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
	}
	
	getWrapperStyles() {
		var display = "none";
		if(this.props.store.score[0]>=this.gatherToWin){
			display = "block";
			this.winText = "Player 1 Wins!!!";
		}
		else if(this.props.store.score[1]>=this.gatherToWin){
			display = "block";
			this.winText = "Player 2 Wins!!!";
		}
		return {
			position: 'absolute',
			left:"0",
			top:"0",
			width:"100%",
			height:"100%",
			background:"#4CAF50",
			display: display
		}
	}
	
	render() {
		return (
			<div id="Hello" style={this.getWrapperStyles()}>
				<h1 style={{textAlign:"center", marginTop:"20%", color:"#fff"}}>{this.winText}</h1>
				<button onClick = {()=>{
						this.props.store.mode = "restart";
						this.props.store.score = [0,0];
						setTimeout(()=>{
							this.props.store.mode = "play";
						},1000);
					}}
					style={{
						width: "30%",
						marginLeft: "35%",
						height: "10%",
						background: "none",
						border: "4px solid #fff",
						borderRadius: "15px",
						textAlign: "center",
						color: "#fff",
						fontSize: "25px",
						textTransform: "uppercase"
					}}
				>Restart Game</button>
			</div>
		);
	}
}