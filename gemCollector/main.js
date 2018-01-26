import Game from './game.jsx';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import code_text from './customcode.js';

class MyNewGame{
    constructor(){
        //ReactDOM.render(<Game key={0} player1= {(world) => this.getCommands(world,1)} player2= {(world) => this.getCommands(world,2)}/>,document.getElementById('game1'));
        ReactDOM.render(
        <div id={"game-"+1} style={{height: '100vh', width: '100%'}}>
            <Game key={0} gameId={0}/>
			<Game key={1} gameId={1}  player2= {(world) => this.getCommands(world,2)}/>
			<Game key={2} gameId={2}  player1= {(world) => this.getCommands(world,1)}  player2= {(world) => this.getCommands(world,2)}/>
			<Game key={3} gameId={3}  player1= {(world) => this.getPlayersCommands(world,1)}  player2= {(world) => this.getCommands(world,2)}/>
			<h4>{'function getPlayersCommands(world, playerNum){'}</h4>
			<textarea id={"customCode"} style={{"width":"100%", height:"600px"}}></textarea>
			<h4>{'}'}</h4>
			<button onClick={this.updateCustomCode.bind(this)}>Update code</button>
        </div>,document.getElementById('game')
        );
        this.timestamp = 0;
        this.timing = 1000;
		document.getElementById("customCode").value = code_text;
		this.customCode = code_text;
    }
    getCommands(world, playerNum){
        //var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
		var player = world.players[playerNum-1];
        var closestGem = false;
		var closest
        world.stones.forEach(stone => {
			if(closestGem==false)
				closestGem = stone;
			else if(
				Math.abs(Math.sqrt(closestGem.x*closestGem.x+closestGem.y*closestGem.y)-Math.sqrt(player.x*player.x+player.y*player.y))>
				Math.abs(Math.sqrt(stone.x*stone.x+stone.y*stone.y)-Math.sqrt(player.x*player.x+player.y*player.y))
			){
				closestGem = stone;
			}
        });
        if(closestGem){
            if(closestGem.x-player.x>10){
				var direction = {left:false, right:true, up:false, down:false};
			}   
            else if(closestGem.x-player.x<-10){
				var direction = {left:true, right:false, up:false, down:false};
			}
            else if(closestGem.y-player.y>10){
				var direction = {left:false, right:false, up:false, down:true};
			}
            else if(closestGem.y-player.y<-10){
				var direction = {left:false, right:false, up:true, down:false};
			}
            return direction;
        }
        else if(Date.now() - this.timestamp>=this.timing){
			var newState = Math.floor(Math.random()*(11-8+1)+8);
            this.timestamp = Date.now();
			if(newState == 11) 
				var direction = {left:false, right:true, up:false, down:false};
			else if(newState == 10) 
				var direction = {left:false, right:false, up:false, down:true};
			else if(newState == 9) 
				var direction = {left:true, right:false, up:false, down:false};
			else if(newState == 8) 
				var direction = {left:false, right:false, up:true, down:false};
            return direction;
		}
    }
	getPlayersCommands(world, playerNum){
		try {
			var expression = this.customCode;
			var result = eval('(function() {' + expression + '}())');
			return result;
		} catch (err) {
			//console.log(err);
		}
	}
	updateCustomCode(){
		this.customCode = document.getElementById("customCode").value;
	}
}

var newGame = new MyNewGame();