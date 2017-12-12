import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Loop, Stage, Sprite, TileMap } from 'react-game-kit';
import Background from "./background.jsx";
import Houses from "./houses.jsx";
import Character from "./character.jsx";

class Game extends Component {
	constructor(props){
		super(props);
	}
  	render() {
		return (
			<Loop>
				<Stage width={576} height={576} style={{ background: '#3a9bdc' }}>
					<Background/>
					<Houses/>
					<Character context = {this.context}/>
				</Stage>
			</Loop>
		);
	}
}

ReactDOM.render(<Game/>, document.getElementById('game'));