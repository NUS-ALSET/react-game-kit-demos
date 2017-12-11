import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Sprite } from 'react-game-kit';

export default class Character extends Component {
	constructor(props, context) {
		super(props);
		this.state={
			startPosition: 0,
			characterState: 1
		};
		this.getWrapperStyles = this.getWrapperStyles.bind(this);
	}
	static contextTypes = {
		loop: PropTypes.object
	};
	loop = () => {
		if(this.state.startPosition>500)
			this.setState({
				characterState: 2,
			});
		else if(this.state.startPosition<10)
			this.setState({
				characterState: 3,
			});
		//Do stuff here
		if(this.state.characterState==3)
			this.setState({
				startPosition: this.state.startPosition+2,
			});
		else
			this.setState({
				startPosition: this.state.startPosition-2,
			});
	};

	componentDidMount() {
		this.loopID = this.context.loop.subscribe(this.loop);
	}

	componentWillUnmount() {
		this.context.loop.unsubscribe(this.loopID);
	}
	getWrapperStyles() {
		var startPosition = this.state.startPosition;
		return {
		  position: 'absolute',
		  transform: 'translate('+startPosition+'px, 130px) translateZ(0)',
		  transformOrigin: 'top left',
		};
	}

  render() {
    return (
		<div id={"character"} style={this.getWrapperStyles()}>
			<Sprite
				repeat={true}
				tileWidth={400}
				tileHeight={600}
				src="assets/character-sprite.png"
				scale={0.5}
				state={this.state.characterState}
				steps={[3,3,3,3]}
			/>
		</div>
	)}
}