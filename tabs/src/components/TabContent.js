import React from 'react';


let TabContent = ({active, children}) => ( // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    <div className={active ? 'active' : ''}>
        {children}
    </div>
);

export default TabContent;