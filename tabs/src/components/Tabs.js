import React from 'react';
import { Provider, connect} from 'react-redux';
import { Route } from 'react-router-dom';
import TabLabel from './TabLabel';
import TabContent from './TabContent';

const labels = ['tab1', 'tab2', 'tab3'];
let Tabs = ({current = 0, tabs = [], onClick, match}) => { // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    // tabs is a array. Per item in it is a obj{label:..., content: ...}. 
    // console.log(8, match);
    // let keys = Object.keys(tabs);
    current = current || 0;
    return (<div className="tabs">
        <div className="tab-head">
            {/* 循环输出时用 map 而非 forEach ，因为 forEach 没有返回值 */}
            {
                labels.map((label, i) => (
                    <TabLabel index={i} key={i} onClick={onClick} to={'/' + label}>{label}</TabLabel>
                ))
            }
            
        </div>
        {/* tabs 的 content 在非激活态时，一般是隐藏，而不是直接干掉，所以写了这么个路由 */}
            <Route path="/:filter" render={({match}) => {
                    console.log(match);
                {/*要确保 current 没获取到时，值为0                */}
                labels.some((label, i) => (current = match.params.filter === label ? i : 0));
                return (<div className="tab-content">
                    <TabContent index={0} key={0} active={0 === current}>{ 'content1' }</TabContent>
                    <TabContent index={1} key={1} active={1 === current}>{ 'content2 two' }</TabContent>
                    <TabContent index={2} key={2} active={2 === current}>{ 'content3  long' }</TabContent>
                
                </div>)
            }} />
    </div>)
};

export default Tabs;