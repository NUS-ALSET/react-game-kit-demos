import React, {Component} from 'react';

import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Background from "./background.jsx";
import Character from "./character.jsx";
import Stone from "./stone.jsx";
import Grass from "./grass.jsx";
import Score from "./score.jsx";
import Matter from 'matter-js';
import GameStore from './store/game-store.jsx';
import { observer } from 'mobx-react';

@observer
export default class Game extends Component {
	constructor(props){
		super(props);
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
		return (
			<Loop>
				<Stage width={576} height={576} style={{ background: '#3a9bdc' }}>
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
						/>
						<Character
							keys = {this.keyListener2}
							store = {GameStore}
							imgSrc = {"assets/character-brunette.png"}
							key = {1}
							index = {1}
						/>
						{GameStore.stonesData.map((stone, index) => {
							return <Stone store={GameStore} key = {index} index = {index}/>;
						})}
						<Score store={GameStore} left={'0'} right={"none"} playerId={0}/>
						<Score store={GameStore} left={"none"} right={'0'} playerId={1}/>
					</World>
				</Stage>
			</Loop>
		);
	}
	physicsInit(engine) {
		
	};
	colissionHandler(engine) {
		if(engine.pairs[0].bodyA.label=="stone"){
			GameStore.stonesData.splice(engine.pairs[0].bodyA.customId,1);
			GameStore.score[engine.pairs[0].bodyB.customId]++;
		}
		if(engine.pairs[0].bodyB.label=="stone"){
			GameStore.stonesData.splice(engine.pairs[0].bodyB.customId,1);
			GameStore.score[engine.pairs[0].bodyA.customId]++;
		}
	};
	updateHandler(engine){
		if(this.props.player1)
			var player1State = this.props.player1(engine.source.world);
		if(this.props.player2)
			var player2State = this.props.player2(engine.source.world);
		if(player1State)
			GameStore.characterState[0] = player1State;
		if(player2State)
			GameStore.characterState[1] = player2State;
		engine.source.world.bodies.map((body, index) => {
			if(body.label=="stone"){
				if(body.position.x!=GameStore.stonesData[body.customId].x||
				body.position.y!=GameStore.stonesData[body.customId].y){
					Matter.Body.setPosition(body, GameStore.stonesData[body.customId])
				}
			}
		});
		var newTimestamp = Date.now();
		if(newTimestamp - GameStore.timeStampData>=5000){
			GameStore.timeStampData = Date.now();
			if(GameStore.stonesData.length==0){
				var stonesQuant = Math.floor(Math.random()*(5-3+1)+3);
				for(var i=0;i<stonesQuant;i++){
					var stoneObj = {x:0, y:0}
					stoneObj.x = Math.floor(Math.random()*(6-0+1)+0)*100;
					stoneObj.y = Math.floor(Math.random()*(6-0+1)+0)*100;
					GameStore.stonesData.push(stoneObj);
				}
			}
		}
	}
}