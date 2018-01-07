import Game from './game.jsx';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class MyNewGame{
    constructor(){
        //ReactDOM.render(<Game key={0} player1= {(world) => this.getCommands(world,1)} player2= {(world) => this.getCommands(world,2)}/>,document.getElementById('game1'));
        ReactDOM.render(
        <div id={"game-"+1} style={{height: '100vh', width: '100%'}}>
            <Game key={0} gameId={0}/>
			<Game key={0} gameId={1}  player2= {(world, stones) => this.getCommands(world,2,stones)}/>
			<Game key={1} gameId={2}  player1= {(world, stones) => this.getCommands(world,1,stones)}  player2= {(world, stones) => this.getCommands(world,2, stones)}/>
        </div>,document.getElementById('game')
        );
        this.timestamp = 0;
        this.timing = 1000;
    }
    getCommands(world, playerNum, stonesData){
        var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
        var closestGem = false;
        stonesData.forEach(gem => {
			if(closestGem==false)
				closestGem = gem;
			else if(
				Math.sqrt(closestGem.x*closestGem.x+closestGem.y*closestGem.y)>
				Math.sqrt(gem.x*gem.x+gem.y*gem.y)
			){
				closestGem = gem;
			}
        });
        if(closestGem){
            if(closestGem.x-player.position.x>10)
                var newState = 11;
            else if(closestGem.x-player.position.x<-10)
                var newState = 9;
            else if(closestGem.y-player.position.y>10)
                var newState = 10;
            else if(closestGem.y-player.position.y<-10)
                var newState = 8;
            return newState;
        }
        else if(Date.now() - this.timestamp>=this.timing){
			var newState = Math.floor(Math.random()*(11-8+1)+8);
            this.timestamp = Date.now();
            return newState;
		}
    }
}

var newGame = new MyNewGame();