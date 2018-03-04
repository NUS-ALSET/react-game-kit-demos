import gameConfig from '../config.json';
const defaultState = [];

export default function(state = defaultState, action){
	const data = action.payload;
	const collectedData = gameConfig.collectedObjects;
	switch(action.type){
		case 'GENERATE_PLAYER_COLLECTIVES':
			if(!state[data.gameIndex])
				state[data.gameIndex] = [];
			if(state[data.gameIndex].length>0)
				return state;
			var stonesQuant = Math.floor(Math.random()*(collectedData.maxAmount-collectedData.minAmount+1)+collectedData.minAmount);
			for(var i=0;i<stonesQuant;i++){
				var stoneObj = {x:0, y:0}
				stoneObj.x = Math.floor(Math.random()*(gameConfig.gameWidth/collectedData.size-0)+0)*collectedData.size;
				stoneObj.y = Math.floor(Math.random()*(gameConfig.gameHeight/collectedData.size-0)+0)*collectedData.size;
				stoneObj.size = collectedData.size;
				state[data.gameIndex].push(stoneObj);
			}
			state = [...state];
			return state;
		case 'REMOVE_PLAYER_COLLECTIVE':
			state[data.gameIndex].splice(data.collectiveIndex,1);
			state = [...state];
			return state;
	}
	return state;
}