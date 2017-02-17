import React from 'react';
import { Provider, connect} from 'react-redux';
import TabLabel from './TabLabel';
import TabContent from './TabContent';

let Tabs = ({current, tabs, onClick, params}) => { // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    // tabs is a array. Per item in it is a obj{label:..., content: ...}. 
    // console.log(params);
    // let keys = Object.keys(tabs);
    current = current || 0;
    return (<div className="tabs">
        <div className="tab-head">
            {/* 用 map 而非 forEach ，因为 forEach 没有返回值 */}
            {
                tabs.map(function (tab, index) {
                    let label = tab.label;
                    // 记得 return , map 会使用 return 的东西组件新数组，不 return ，则新数组就是空，组件也就是空了
                    return <TabLabel index={index} key={index} active={index === current} onClick={onClick} to={label}>{label}</TabLabel>
                })
            }
        </div>
        <div className="tab-content">
            {
                tabs.map(function (tab, index) {
                    let content = tab.content;
                    return <TabContent index={index} key={index} active={index === current}>{ content }</TabContent>
                })
            }
        </div>
    </div>)
};

export default Tabs;