import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './node';
import { mapChildren } from './util';

// 主要是收集 children 并打平
// function nodeToData(node, key, track, parentKey) {
//     let data = {
//         key,
//         childrenKeys: [],
//         parentKey,
//     }
//     track[key] = data;
//     let child = node.props.children;
//     mapChildren(child, (item, index) => {
//         data['childKey'].push(key + "-" + index);
//         return treeNodeToData(item, key+"-"+index, track, key)
//     })
// }
// treeNodeToData(treeNode, key, track, parentKey)
function treeNodeToData(treeNode, key, track, parentKey) {
    // console.log(key)
    const data = {
        key,
        'childKey': [],
        parentKey
    }
    if (!treeNode) {
 return;
}
    track[key] = data;
    const { children } = treeNode.props;
    mapChildren(children, (item, index) => {
        data.childKey.push(`${key}-${index}`);

return treeNodeToData(item, `${key}-${index}`, track, key)
    })
}
class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'checkedKeys': props.checkedKeys,
            'halfCheckedKeys': props.halfCheckedKeys,
            'expandedKeys': props.defaultExpandedKeys || []
        };
    }

    componentDidMount() {
        const nodeTrack = {};
        const { children } = this.props;
        children.map((item, index) => treeNodeToData(
item,
                    `${index}`,
                    nodeTrack,
                    null
                ))
        // 所有的信息都在这里
        this.setState({
            nodeTrack
        })
    }

    onNodeClick = (halfCheckedKeys, checkedKeys) => {
        this.setState({
            halfCheckedKeys,
            checkedKeys
        })
    }

    updateExpanded = (expandedKeys) => {
        this.setState({
            expandedKeys
        })
    }

    renderChildren = (child, key) => React.cloneElement(child, {
            'Key': `${key}`,
            'initKey': child.key,
            'isHalfChecked': this.state.halfCheckedKeys.includes(`${key}`),
            'isChecked': this.state.checkedKeys.includes(`${key}`),
            'isExpanded': this.state.expandedKeys.includes(child.key),
            'halfCheckedKeys': this.state.halfCheckedKeys,
            'checkedKeys': this.state.checkedKeys,
            'expandedKeys': this.state.expandedKeys,
            'keyEntities': this.state.nodeTrack,
            'onNodeClick': this.onNodeClick,
            'updateExpanded': this.updateExpanded,
            'isSingle': !('children' in child.props)
    })


    render() {
        const { children } = this.props;

return <div>
            {
                // eslint-disable-next-line max-len
                !Array.isArray(children) ? this.renderChildren(children, 0) : children.map((i, idex) => this.renderChildren(i, idex))
            }
        </div>
    }
}
Tree.propTypes = {
    'checkedKeys': PropTypes.array,
    'halfCheckedKeys': PropTypes.array,
    'expandedKeys': PropTypes.array,
    'defaultExpandedKeys': PropTypes.array,
    'children': PropTypes.elementType
}
Tree.defaultProps = {
    'checkedKeys': [],
    'halfCheckedKeys': [],
    'expandedKeys': [],
    'defaultExpandedKeys': [],
    'children': null
}
Tree.TreeNode = TreeNode;

export default Tree
