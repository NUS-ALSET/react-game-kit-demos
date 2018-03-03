import gameConfig from '../config.json';

export default function(state=null, action){
	switch(action.type){
        case 'MOVE_BOT': 
            if(state==null) state=[];
            const character = gameConfig.games[action.payload.gameIndex].character;
            if(!state[action.payload.gameIndex]){
                state[action.payload.gameIndex] = {x: character.startingPoint.x, y: character.startingPoint.y, direction: action.payload.direction, speed: character.speed}
            }
            else{
                state = [...state];
                switch(state[action.payload.gameIndex].direction){
                    case 'up':
                        state[action.payload.gameIndex] = {...state[action.payload.gameIndex], y:state[action.payload.gameIndex].y-state[action.payload.gameIndex].speed};
                        break;
                    case 'down':
                        state[action.payload.gameIndex] = {...state[action.payload.gameIndex], y:state[action.payload.gameIndex].y+state[action.payload.gameIndex].speed};
                        break;
                    case 'left':
                        state[action.payload.gameIndex] = {...state[action.payload.gameIndex], x:state[action.payload.gameIndex].x-state[action.payload.gameIndex].speed};
                        break;
                    case 'right':
                        state[action.payload.gameIndex] = {...state[action.payload.gameIndex], x:state[action.payload.gameIndex].x+state[action.payload.gameIndex].speed};
                        break;
                    default:
                        state[action.payload.gameIndex] = {...state[action.payload.gameIndex], y:state[action.payload.gameIndex].y+state[action.payload.gameIndex].speed};
                        break;
                }
            }
            return state;
        case 'UPDATE_BOT_DIRECTION':
            state[action.payload.gameIndex].direction=action.payload.direction;
            return state;
        case 'UPDATE_BOT_SPEED':
            state[action.payload.gameIndex].speed=action.payload.speed;
            return state;
        case 'RESTART':
            for(var i=0;i<state.length;i++){
                var character2 = gameConfig.games[i].character;
                state[i] = {x: character2.startingPoint.x, y: character2.startingPoint.y, direction: "down", speed: character2.speed}
            }
            return state;
	}
	return state;
}