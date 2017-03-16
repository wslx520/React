// 这个容器组件，会被引入到 ../components/Tabs 中
// 容器组件要与 redux 的 store 交互，所以要比普通组件多引入一些包

import React from 'react';
// 引入 connect
import { connect } from 'react-redux';
// 引入 actionCreator
import switchTab from '../actions/switchTab';
// 引入要用到的展示组件
import Tabs from '../components/Tabs';


// 这是 connect 的第 1 个参数，决定如何将 state 的属性映射到组件的 props 上
let mapStateToProps = (state, ownProps) => {
    // 此函数必须返回一个纯对象
    // 如下，则 props 中会出现一个 index 属性
    // 初始化时，可能路由有值，但 state 无值
    // 路由的值，保存在 ownProps 的 params 中
    // console.log(state, ownProps);
    return {
        // so, 根据路由的值，算出当前位于哪个 tab
        current: state.index === undefined ? (() => {
            let { tabs = [], match } = ownProps;
            let {params:{filter}} = match;
            let cur = 0;
            tabs.some((tab, i) => {
                if (tab.label === filter) {
                    cur = i;
                    // some 接受的函数，并不需要显式返回 boolean 值 true 或 false，想要
                    // 终止循环，返回 truthy 值就行了
                    return true;
                }
            });
            return cur;
        })() : state.index 
    }
}
// 这是 connect 的第 2 个参数，决定如何将 dispatch 方法映射到组件的 props 上
// 如果不传，默认是一个直接返回 dispatch 方法的函数。这样的话，props 上就
// 会多一个 dispatch 属性（其实就是 store.dispatch 方法）
let mapDispatchToProps = (dispatch, ownProps) => {
    // 这就是默认返回
    // return {dispatch};
    // 如下的话，则 props 中找不到 dispatch 方法，但会多出一个 onClick 属性
    // 其是一个函数，调用它则调用了 dispatch 方法
    console.log(ownProps);
    return {
        // 为此函数加个参数，调用时传入
        onClick: (index) => {
            // dispatch 要传入的是 action
            // 这里执行了一个 actionCreator，并将结果传给了 dispatch
            console.log(ownProps);
            dispatch(switchTab(index, ownProps.current));
        }
    }
}
let TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);
export default TabsContainer;