import React, {Component} from 'react';
import GamesContainer from '../containers/GamesContainer';

class App extends Component {
	render(){
		return <div>
			<GamesContainer type="player"/>
			<GamesContainer type="bot"/>
		</div>
	}
}

export default App;