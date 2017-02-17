import React from 'react';

import { Router, Route, browserHistory } from 'react-router';
import TabsContainer from '../containers/TabsContainer';

let initTabs = ({params}) => (
    <TabsContainer current="0" params={params} tabs={
        [{
            label: 'tab1', content: 'content 1'
        },{
            label: 'tab2', content: 'content 2'
        },{
            label: 'tab3', content: 'content 3 with <b>strong</b>'
        },]
    } />
)
var APP = () => ( // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    // history 必传，不传则报: Uncaught TypeError: Cannot read property 'getCurrentLocation' of undefined
    // 值有两种： browserHistory 或 hashHistory ，均来自于 react-router
    <Router history={browserHistory}>
        <Route path="/(:filter)" component={initTabs} />
    </Router>
);

export default APP;