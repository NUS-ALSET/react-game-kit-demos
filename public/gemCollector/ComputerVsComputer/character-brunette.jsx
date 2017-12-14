import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Sprite, Body } from 'react-game-kit';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

@observer
export default class CharacterBlonde extends Component {
	static propTypes = {
		store: PropTypes.object,
	};
	static contextTypes = {
		engine: PropTypes.object,
		scale: PropTypes.number,
	};
	constructor(props, context) {
		super(props);
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
		this.update = this.update.bind(this);
		this.move = this.move.bind(this);
	}
	getWrapperStyles() {
		var x = this.props.x;
		var y = this.props.y;
		return {
		  position: 'absolute',
		  transform: 'translate('+x+'px, '+y+'px) translateZ(0)',
		  transformOrigin: 'top left',
		};
	}
	update = () => {
		this.move();
		
	}
	
	move() {
		Matter.Body.setVelocity(this.body2.body, { x: 0, y: 1 });
		this.props.updatePosition(this.body2.body.position);
	};
	
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
				args={[this.props.x, this.props.x, 128, 128]}
				inertia={Infinity}
				ref={b => {
					this.body2 = b;
				}}
			>
				<Sprite
					repeat={true}
					tileWidth={64}
					tileHeight={64}
					ticksPerFrame={4}
					src="assets/character-brunette.png"
					scale={2}
					state={10}
					steps={[6,6,6,6,7,7,7,7,8,8,8,8,5,5,5,5,12,12,12,12,5]}
				/>
			</Body>
			</div>
		)
	}
}