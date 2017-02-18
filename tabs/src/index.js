import React from 'react';
import {render} from 'react-dom'
import {createStore, combineReducers } from 'redux';
import {Provider } from 'react-redux';
import APP from './components/APP';
import reduces from './reduces';
// 引入 css，这里与 webpack 不一样，不是引入 scss
import './sass/index.css';
let store = createStore(reduces);

let root = document.getElementById('root');

render(
    <Provider store={store}>
        <APP />
    </Provider>,
    root
);