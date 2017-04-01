import React from 'react';
import RcTree from 'rc-tree';
import './TreeFolder.css';
// import animation from '../_util/openAnimation';

const {TreeNode} = RcTree;

let dataToNode = (data) => data.map(item => {
    if (item.children) {
        return <TreeNode key={item.key} title={item.name} id={item.id} item={item}>{dataToNode(item.children)}</TreeNode>
    } else if (item.newBuilding) {
        let input = <Input type="text" placeholder="请输入文件夹名" onPressEnter={(e) => {
            console.log(this);
        }} />;
        return <TreeNode isLeaf={true} key={item.id}  title={input} id={item.id} />
    }
    return <TreeNode isLeaf={item.folderNumber === 0} title={item.name} key={item.key} id={item.id} item={item} />;
    // return <TreeNode isLeaf={item.type !== 0} title={item.name} key={item.key} id={item.id} item={item} />;
});

let newNode = function (pid) {
    return {
      "id": (Date.now() + '').slice(-6),
      "pid": pid,
      "name": "新建文件夹",
      "type": 0,
      "lastModified": Date.now(),
      "folderNumber": 0,
      "newBuilding": true
    }
    
}

let Input = (props) => {
    let {onPressEnter = () => {}} = props;
    let onPress = (e) => {
        // console.log(e, e.key, e.keyCode, e.which);
        if (e.key && e.key.toLowerCase() === 'enter' || e.keyCode === 13) {
            onPressEnter(e);
        }
    }
    let pureProperty = Object.assign({}, props);
    delete pureProperty.onPressEnter;
    return <input {...pureProperty} onKeyPress={onPress} />
}
class TreeFolder extends  React.Component {
    state = {
        treeData: [],
        expandedKeys: []
    }
    static TreeNode = TreeNode;

    static defaultProps = {
        prefixCls: 'jgui-tree-folder',
        checkable: false,
        showIcon: true,
        // openAnimation: animation,
    }

    constructor(props) {
        super(props);
        let {url = 'http://localhost:3333/files'} = props;
        this.url = url;
        this.onLoadData = this.onLoadData.bind(this);
        this.root = props.root || 0;
        this.currentNode = null;
        this.whenSelect = (info, e) => {
            if (e) {
                this.currentNode = e.selected ? e.node : null;
            }
            if (typeof props.onSelect === 'function') {
                props.onSelect.call(this, info, e);
            }
        }

        fetch(`${this.url}?pid=${this.root}`).then(response => response.json()).then(node => {
            if (!Array.isArray(node)) node = [node];
            node.forEach(n => {
                n.title = n.name;
                n.key = n.id
            });
            return this.setState({
                treeData: node
            });
        });
    }
    appendNode() {
        if (this.currentNode) {
            let {treeData, expandedKeys} = this.state;
            let {item} = this.currentNode.props;
            if (!item.children || !item.children.length) {
                item.children = [];
            }
            let node = newNode(item.id);
            item.children.unshift(node);
            expandedKeys.push(this.currentNode.props.eventKey);
            let selectedKeys = [node.id];
            console.log(this.currentNode,expandedKeys)
            this.setState({treeData, expandedKeys, selectedKeys});
        }
    }
    onLoadData(treeNode) {
        // let {dispatch} = treeNode.props;
        // dispatch(toLoadData(treeNode));
        let {props} = treeNode;
        let {item} = props;
        // console.log(props);
        if (item.children) {
            return Promise.resolve();
        }
        let treeData = this.state.treeData;
        return fetch(`${this.url}?pid=${props.id}`).then(response => response.json()).then(node => {
            if (!Array.isArray(node)) node = [node];
            node.forEach(n => {
                n.title = n.name;
                n.key = props.eventKey + '-' + n.id
            });
            item.children = node;
            // console.log(item);
            return this.setState({
                treeData
            });
        });
    }
    onExpand(keys) {
        console.log(keys);
        this.setState({
            expandedKeys: keys
        })
    }
    render() {
        const props = this.props;
        let checkable = props.checkable;
        if (checkable) {
            checkable = <span className={`${props.prefixCls}-checkbox-inner`}></span>;
        }
        let nodes = dataToNode(this.state.treeData);
        // console.log(nodes);
        let expanded = this.state.expandedKeys ? {
            expandedKeys: this.state.expandedKeys
        } : '';
        let selected = this.state.selectedKeys ? {
            selectedKeys: this.state.selectedKeys
        } : '';
        return (
            <RcTree {...props} loadData={this.onLoadData} {...expanded} {...selected} onExpand={this.onExpand.bind(this)}  onSelect={this.whenSelect.bind(this)}
                >
                {nodes}
            </RcTree>
        )
    }
}

export default TreeFolder;