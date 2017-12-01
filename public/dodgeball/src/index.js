import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {autoRehydrate, persistStore} from 'redux-persist';
import {asyncSessionStorage} from 'redux-persist/storages';

import reducers from './reducers/index';

import AppContainer from './components/AppContainer';

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
export const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(...[thunk]),
        autoRehydrate()
    )
);

persistStore(store, {storage: asyncSessionStorage}, () => {
  ReactDOM.render(
      (
          <Provider store={store}>
              <AppContainer/>
          </Provider>
      ),
      document.getElementById('root')
  )
});

registerServiceWorker();
