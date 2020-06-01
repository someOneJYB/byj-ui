import React from 'react';
import { storiesOf } from '@storybook/react';
import Tree from '../Tree';
const TreeNode = Tree.TreeNode
// import { withInfo } from '@storybook/addon-info';

storiesOf('Tree 用法', module)
    .add('基本用法',() => (
        <Tree defaultExpandedKeys = {["one"]}>
            <TreeNode title="0" key="one">
                <TreeNode title="0-0" key="one-0"/>
                <TreeNode title="0-1" key="one-1">
                    <TreeNode title="0-1-0" key="one-1-0">
                        <TreeNode title="0-1-0-0" key="one-1-0-0"/>
                    </TreeNode>
                    <TreeNode title="0-1-1" key="one-1-1"></TreeNode>
                    <TreeNode title="0-1-2" key="one-1-2"></TreeNode>
                </TreeNode>
                <TreeNode title="0-2" key="one-2"></TreeNode>
            </TreeNode>
            <TreeNode title="1" key="two">
                <TreeNode title="1-0" key="two-0">
                    <TreeNode title="1-0-0" key="two-0-0">
                        <TreeNode title="1-0-0-0" key="two-0-0-0"></TreeNode>
                    </TreeNode>
                </TreeNode>
            </TreeNode>
            <TreeNode title="2" key="three"></TreeNode>
        </Tree>
    ))

