import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import allReucers from './reducers';
import App from './components/App';

const store = createStore(allReucers);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById("game")
);