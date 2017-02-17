import React from 'react';
import {render} from 'react-dom'
import {createStore, combineReducers } from 'redux';
import {Provider } from 'react-redux';
import APP from './components/APP';

import reduces from './reduces';

let store = createStore(reduces);

let root = document.getElementById('root');

render(
    <Provider store={store}>
        <APP />
    </Provider>,
    root
);