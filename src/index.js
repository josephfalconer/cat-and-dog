import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

import reducers from './reducers';
import App from './containers/App.js';

const store = createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
);

render (
	<Provider store={store}>
	    <App />
	</Provider>,
    document.getElementById('root')
);