import React from 'react';

import {Modal, Button} from 'antd';
import TreeFolder from '../TreeFolder/TreeFolder';
import 'antd/lib/tree/style/css';
import 'antd/lib/modal/style/css';
// import './TreeFolderModal.scss';
// import animation from '../_util/openAnimation';


class TreeFolderModal extends  React.Component {
    state = {
        visible: true
    }

    static defaultProps = {
        // prefixCls: 'tree-modal',
        checkable: false,
        showIcon: true,
        // openAnimation: animation,
    }

    onSelectFolder(key, e) {
        console.log(key, e);
        if (e) {
            this.setState({
                folderSelected: e.selected
            })
        }
    }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
        this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    appendFolder() {
        console.log(this.refs.tree);
        this.refs.tree.appendNode()

    }
    render() {
        const props = this.props;
        let {visible = true} = this.state;
        return (<Modal {...props} visible={visible} footer={[
            <Button key="newfolder" size="large" className="newfolder" disabled={!this.state.folderSelected} onClick={this.appendFolder.bind(this)}>新建文件夹</Button>,
            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              确定
            </Button>,
          ]}>
            <TreeFolder ref="tree" onSelect={this.onSelectFolder.bind(this)} />
        </Modal>)
    }
}

export default TreeFolderModal;