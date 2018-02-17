export default function(state=[], action){
	switch(action.type){
		case 'FILL_BOT_GAME_DATA':
			return action.payload;
	}
	return state;
}