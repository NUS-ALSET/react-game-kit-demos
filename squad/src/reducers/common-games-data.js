import gameConfig from '../config.json';
const defaultState = {
	currentPlayer:0,
	botScore:0,
	playerScore:0,
	gameState:'play',
	time: Date.now()
}
export default function(state=defaultState, action){
	switch(action.type){
		case 'SWITCH_PLAYER':
			if(Date.now()-state.time<150)
				return state;
			var gameQuant = gameConfig.games.length;
			if(state.currentPlayer==gameQuant-1)
				state.currentPlayer = 0;
			else
				state.currentPlayer++;

			state.time=Date.now();
			state = {...state};
			return state;
		case 'INCREMENT_PLAYER_SCORE':
			state.playerScore++;
			state = {...state};
			return state;
		case 'INCREMENT_BOT_SCORE':
			state.botScore++;
			state = {...state};
			return state;
		case 'CHANGE_GAME_STATE':
			state.gameState = action.payload;
			state = {...state};
			return state;
		case 'RESTART':
			state.botScore = 0;
			state.playerScore = 0;
			state = {...state};
			return state;
	}
	return state;
}