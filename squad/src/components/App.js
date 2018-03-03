import React, {Component} from 'react';
import GamesContainer from '../containers/GamesContainer';

class App extends Component {
	render(){
		return <div>
			<GamesContainer type="player"/>
			<GamesContainer script={(world)=>{return this.getCommands(world)}} type="bot"/>
		</div>
	}
	getCommands(world){
		//console.log(world);
        //var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
		var player = world.player;
        var closestGem = false;
        world.collectives.forEach(stone => {
			if(closestGem==false)
				closestGem = stone;
			else if(
				Math.sqrt(Math.pow((player.x-closestGem.x),2)+Math.pow((player.y-closestGem.y),2))>
				Math.sqrt(Math.pow((player.x-stone.x),2)+Math.pow((player.y-stone.y),2))
			){
				closestGem = stone;
			}
        });
        if(closestGem){
            if(closestGem.x-player.x>64){
				var direction = {left:false, right:true, up:false, down:false};
			}   
            else if(closestGem.x-player.x<0){
				var direction = {left:true, right:false, up:false, down:false};
			}
            else if(closestGem.y-player.y>64){
				var direction = {left:false, right:false, up:false, down:true};
			}
            else if(closestGem.y-player.y<0){
				var direction = {left:false, right:false, up:true, down:false};
			}
			//console.log(direction);
            return direction;
        }
    }
}

export default App;