import React, {Component} from 'react';

import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Background from "./background.jsx";
import Character from "./character.jsx";
import Stone from "./stone.jsx";
import Grass from "./grass.jsx";
import Score from "./score.jsx";
import Info from "./info.jsx";
import Matter from 'matter-js';
import GameStore1 from './store/game-store1.jsx';
import GameStore2 from './store/game-store2.jsx';
import GameStore3 from './store/game-store3.jsx';
import { observer } from 'mobx-react';
@observer
export default class Game extends Component {
	constructor(props){
		super(props);
		if(this.props.gameId == 0)
			var GameStore = GameStore1;
		else if(this.props.gameId == 1)
			var GameStore = GameStore2;
		else if(this.props.gameId == 2)
			var GameStore = GameStore3;
		if(props.player1)
			this.keyListener1 = {status:false};
		else
			this.keyListener1 = new KeyListener();
		if(props.player2)
			this.keyListener2 = {status:false};
		else
			this.keyListener2 = new KeyListener();
		this.updateHandler = this.updateHandler.bind(this);
	}
	componentDidMount() {
		if(this.keyListener1&&this.keyListener1.status!==false)
			this.keyListener1.subscribe([
			this.keyListener1.LEFT,
			this.keyListener1.RIGHT,
			this.keyListener1.UP,
			this.keyListener1.DOWN,
		]);
		if(this.keyListener2&&this.keyListener2.status!==false)
			this.keyListener2.subscribe([
			73,
			74,
			75,
			76,
		]);
	}

	componentWillUnmount() {
		if(this.keyListener1)
			this.keyListener1.unsubscribe();
		if(this.keyListener2)
			this.keyListener2.unsubscribe();
	}
  	render() {
		if(this.props.gameId == 0)
			var GameStore = GameStore1;
		else if(this.props.gameId == 1)
			var GameStore = GameStore2;
		else if(this.props.gameId == 2)
			var GameStore = GameStore3;
		return (
			<Loop>
				<Stage style={{ background: '#3a9bdc' }}>
					<World onUpdate={this.updateHandler} onInit={this.physicsInit} onCollision={this.colissionHandler}
						gravity = {{
							x:0,
							y:0,
							scale:0.001
						}}
					>
						<Grass/>
						<Character
							keys = {this.keyListener1}
							store = {GameStore}
							imgSrc = {"assets/character-blonde.png"}
							key = {0}
							index = {0}
							gameId = {this.props.gameId}
						/>
						<Character
							keys = {this.keyListener2}
							store = {GameStore}
							imgSrc = {"assets/character-brunette.png"}
							key = {1}
							index = {1}
							gameId = {this.props.gameId}
						/>
						{GameStore.stonesData.map((stone, index) => {
							return <Stone store={GameStore} gameId = {this.props.gameId} key = {index} index = {index}/>;
						})}
						<Score store={GameStore} left={'0'} right={"none"} playerId={0}/>
						<Score store={GameStore} left={"none"} right={'0'} playerId={1}/>
						<Info gameId={this.props.gameId}/>
					</World>
				</Stage>
			</Loop>
		);
	}
	physicsInit(engine) {
		
	};
	colissionHandler(engine) {
	};
	updateHandler(engine){
		if(this.props.gameId == 0)
			var GameStore = GameStore1;
		else if(this.props.gameId == 1)
			var GameStore = GameStore2;
		else if(this.props.gameId == 2)
			var GameStore = GameStore3;
		if(this.props.player1)
			var player1State = this.props.player1(engine.source.world, GameStore.stonesData);
		if(this.props.player2)
			var player2State = this.props.player2(engine.source.world, GameStore.stonesData);
		if(player1State)
			GameStore.characterState[0] = player1State;
		if(player2State)
			GameStore.characterState[1] = player2State;
		GameStore.createNewStones();
	}
}