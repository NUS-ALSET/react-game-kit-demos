export default function(state=[], action){
	switch(action.type){
		case 'FILL_PLAYER_GAME_DATA':
			return action.payload;
	}
	return state;
}