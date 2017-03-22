import React from 'react';


let TreeNode = (props) => { // <- 这是个 ( 而不是 {，使用后者则需要在 {} 内部显示使用 return 
    let {type, name, size, mimeType} = props;

    if (type === 0) {
        return <li><span>+</span> {name}</li>;
    }
    return <li>文件：{name}, 类型：{mimeType}</li>
};

export default TreeNode;