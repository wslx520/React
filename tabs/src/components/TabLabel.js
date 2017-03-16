import React from 'react';
// router v4 将带 activeClassName 属性的 Link 独立了出来，变成了 NavLink
// 可通过 as ，像以前一样使用
import { NavLink as Link } from 'react-router-dom';
let TabLabel = (props) => { // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    console.log(props);
    let {active, children, onClick} = props;
    return (<span>
        {/*通过 active 将无路由时的默认 tab 高亮 （这其实是作弊）*/}
        <Link to={props.to} activeClassName="active" onClick={function (e){
            {/*console.log(e.target, this, props.index);*/}
            if (typeof onClick === 'function') onClick(props.index);
        }}>{children}</Link>
        </span>)
};

export default TabLabel;