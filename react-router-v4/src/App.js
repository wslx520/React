import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// 首先是之前的 Router 由 BrowserRouter 取代（除了 BrowserRouter 外，还有其他 Router）
// 如 HashRouter, MemoryRouter, StaticRouter（用于服务器端直出）
// 当然你也可以使用 BrowserRouter as Router ，像以前一样使用 Router
import {BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    {/*随意嵌套html代码或组件*/}
    <div>
      <ul>
        <li>
          {/* Link 导航到指定路由 （v4无变化）*/}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link></li>
        <li>
          <Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>

      {/* exact 严格匹配。不然，/about, /topics等都会匹配到 / ，导致 Home 在它们之下也会显示 */}
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </BrowserRouter>

)


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = ()=> (
  <div>
    <h2>About</h2>
    </div>
)

const Topics = ({match}) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${match.url}/component`}>Component</Link></li>
      <li><Link to={`${match.url}/props-vs-state`}>Props v. State</Link></li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    {/* 注意 render ，是一个函数（v3无此功能）*/}
    <Route path={match.url} render={() => (
        <h3>Please select a topic</h3>
      )} />
  </div>
)

const Topic = ({match}) => (
  <div><h3>{match.params.topicId}</h3></div>
)


export default App;
