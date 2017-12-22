import Game from './game.jsx';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class MyNewGame{
    constructor(){
        ReactDOM.render(<Game key={0} player1= {(world) => this.getCommands(world,1)} player2= {(world) => this.getCommands(world,2)}/>,document.getElementById('game1'));
        this.timestamp = 0;
        this.timing = 1000;
    }
    getCommands(world, playerNum){
        var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
        var closestGem = false;
        world.bodies.forEach(body => {
            if(body.label == "stone"){
                if(closestGem==false)
                    closestGem = body;
                else if(
                    Math.sqrt(closestGem.position.x*closestGem.position.x+closestGem.position.y*closestGem.position.y)>
                    Math.sqrt(body.position.x*body.position.x+body.position.y*body.position.y)
                ){
                    closestGem = body;
                }
            }
        });
        if(closestGem){
            if(closestGem.position.x-player.position.x>10)
                var newState = 11;
            else if(closestGem.position.x-player.position.x<-10)
                var newState = 9;
            else if(closestGem.position.y-player.position.y>10)
                var newState = 10;
            else if(closestGem.position.y-player.position.y<-10)
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