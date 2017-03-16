import React from 'react';

// router v3
// import { Router, Route, browserHistory } from 'react-router';
// router v4
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import TabsContainer from '../containers/TabsContainer';
import Tabs from './Tabs';

const defaultPage = () =>  <h2>Welcome</h2>
var APP = () => ( // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    // history 必传，不传则报: Uncaught TypeError: Cannot read property 'getCurrentLocation' of undefined
    // 值有两种： browserHistory 或 hashHistory ，均来自于 react-router
    // <Router history={browserHistory}>
    <Router>
        <div>
        {/*<div>
            <Link to="ttt2">to ttt2</Link>
            <Route path="/(:filter)" component={initTabs} />
        </div>*/}
        {/*将根目录直接重定向到 tab1*/}
        <Route path="/" exact render={()=>(
            <Redirect to="/tab1" />
        )} />
        <Route path="/:filter" component={TabsContainer} />
        </div>
    </Router>
);

export default APP;