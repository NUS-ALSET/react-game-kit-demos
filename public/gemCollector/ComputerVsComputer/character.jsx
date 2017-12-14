import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Sprite, Body } from 'react-game-kit';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

@observer
export default class Character extends Component {
	static propTypes = {
		store: PropTypes.object,
		imgSrc: PropTypes.string,
		index: PropTypes.number,
		keys: PropTypes.object,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props, context) {
		super(props);
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
		this.update = this.update.bind(this);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.changeCharacterState = this.changeCharacterState.bind(this);
		this.state = {
			characterState:11,
			ticksPerFrame: 4,
		}
		if(this.props.keys)
			this.charPhysicSize = 64;
		else
			this.charPhysicSize = 12;
	}
	getWrapperStyles() {
		var x = this.props.store.characterPosition[this.props.index].x;
		var y = this.props.store.characterPosition[this.props.index].y;
		return {
		  position: 'absolute',
		  transform: 'translate('+x+'px, '+y+'px) translateZ(0)',
		  transformOrigin: 'top left',
		};
	}
	update = () => {
		this.setState((prevState, props)=>{
			this.changeCharacterState();
			if(prevState.characterState[this.props.index]!==this.props.store.characterState[this.props.index])
				return {characterState: this.props.store.characterState[this.props.index]}
			else
				return {characterState: prevState.characterState[this.props.index]};
		});
		
		if(this.state.characterState == 8)
			this.moveUp();
		else if(this.state.characterState == 9)
			this.moveLeft();
		else if(this.state.characterState == 10)
			this.moveDown();
		else if(this.state.characterState == 11)
			this.moveRight();
	}
	
	moveRight() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.x<=(700-110))
			Matter.Body.setVelocity(this.body1.body, { x: 1, y: 0 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
	};
	
	moveLeft() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.x>=0)
			Matter.Body.setVelocity(this.body1.body, { x: -1, y: 0 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
	};
	
	moveUp() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.y>=0)
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: -1 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
	};
	
	moveDown() {
		const position = this.props.store.characterPosition[this.props.index];
		if(position.y<=700-128)
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 1 });
		else
			Matter.Body.setVelocity(this.body1.body, { x: 0, y: 0 });
		this.props.store.characterPosition[this.props.index] = this.body1.body.position;
	};
	
	changeCharacterState() {
		const position = this.props.store.characterPosition[this.props.index];
		var timing = 4000;
		if(this.props.keys){
			if(this.props.keys.isDown(this.props.keys.RIGHT)||this.props.keys.isDown(76))
				var newState = 11;
			else if(this.props.keys.isDown(this.props.keys.LEFT)||this.props.keys.isDown(74))
				var newState = 9;
			else if(this.props.keys.isDown(this.props.keys.UP)||this.props.keys.isDown(73))
				var newState = 8;
			else if(this.props.keys.isDown(this.props.keys.DOWN)||this.props.keys.isDown(75))
				var newState = 10;
			if(newState)
				this.props.store.characterState[this.props.index] = newState;
		}
		else if(this.props.store.stonesData.length!==0){
			if(this.props.store.stonesData[0].x-position.x>10)
				var newState = 11;
			else if(this.props.store.stonesData[0].x-position.x<-10)
				var newState = 9;
			else if(this.props.store.stonesData[0].y-position.y>10)
				var newState = 10;
			else if(this.props.store.stonesData[0].y-position.y<-10)
				var newState = 8;
			if(newState)
				this.props.store.characterState[this.props.index] = newState;
		}
		else if(Date.now() - this.props.store.timeStamp[this.props.index]>=timing){
			var prevState = this.props.store.characterState[this.props.index];
			var newState = this.props.store.characterState[this.props.index];
			while(prevState==newState){
				newState = Math.floor(Math.random()*(11-8+1)+8);
			}
			this.props.store.characterState[this.props.index] = newState;
			this.props.store.timeStamp[this.props.index] = Date.now();
		}
	}
	
	componentDidMount() {
		Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
	}

	componentWillUnmount() {
		Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
	}

	render() {
		return (
			<div id={"character"} style={this.getWrapperStyles()}>
			<Body
				args={[this.props.store.characterPosition[this.props.index].x, 
				this.props.store.characterPosition[this.props.index].y, this.charPhysicSize, this.charPhysicSize]}
				inertia={Infinity}
				customId={this.props.index}
				label={"character"}
				ref={b => {
					this.body1 = b;
				}}
			>
				<Sprite
					repeat={true}
					tileWidth={64}
					tileHeight={64}
					src={this.props.imgSrc}
					scale={2}
					ticksPerFrame={this.state.ticksPerFrame}
					state={this.state.characterState}
					steps={[6,6,6,6,7,7,7,7,8,8,8,8,5,5,5,5,12,12,12,12,5]}
				/>
			</Body>
			</div>
		)
	}
}