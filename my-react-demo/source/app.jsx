'use strict';

require('./style.css');

import TabSelector from './TabSelector';
import React from 'react';
import ReactDom from 'react-dom';

var data = [
  {name: 'Red', value: 'red'},
  {name: 'Blue', value: 'blue'},
  {name: 'Yellow', value: 'yellow'},
  {name: 'Green', value: 'green'},
  {name: 'White', value: 'White'}
];

var node = document.createElement('div');
document.body.appendChild(node);

// wrap to a factory
// TabSelector = React.createFactory(TabSelector);
// then you can do this
// ReactDom.render(
//   TabSelector({label: 'Color', data: data, selected: 1}), node
// );

// if not , you must do like this:

ReactDom.render(
	<TabSelector label="color" data={data} selected="blue" />, node
);