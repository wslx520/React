import React from 'react';
import {Tree} from 'antd';
import toLoadData from '../actions/toLoadData';

const {TreeNode} = Tree;



let dataToNode = (data) => data.map(item => {
    console.log(item.children);
    if (item.children) {
        return <TreeNode key={item.key} title={item.name} id={item.id} item={item}>{dataToNode(item.children)}</TreeNode>
    }
    return <TreeNode isLeaf={item.type !== 0} title={item.name} key={item.key} id={item.id} item={item} />;
});
class TreeList extends  React.Component {
    state = {
        treeData: [{ name: 'pNode 01', key: '0-0', id: 1, type: 0 },]
    }
    onSelect(info) {
        console.log(`selected: ${info}`);
    }

    onLoadData(treeNode) {
        // let {dispatch} = treeNode.props;
        // dispatch(toLoadData(treeNode));
        let {props} = treeNode;
        let {item} = props;
        console.log(props);
        let treeData = this.state.treeData;
        return fetch(`http://localhost:3333/files?pid=${props.id}`).then(response => response.json()).then(node => {
            if (!Array.isArray(node)) node = [node];
            node.forEach(n => {
                n.title = n.name;
                n.key = props.eventKey + '-' + n.id
            });
            item.children = node;
            console.log(item);
            return this.setState({
                treeData
            });
        });
    }

    render() {
        let nodes = dataToNode(this.state.treeData);
        console.log(nodes);
        return (
            <Tree checkable onSelect={this.onSelect} loadData={this.onLoadData.bind(this)}>{nodes}</Tree>
        )
    }
}

export default TreeList;