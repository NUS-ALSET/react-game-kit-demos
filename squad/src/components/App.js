import React from 'react';
import GamesContainer from '../containers/GamesContainer';

const App = () => (
	<div>
		<GamesContainer type="player"/>
		<GamesContainer type="bot" className={'player-bot-holder'}/>
	</div>
);

export default App;