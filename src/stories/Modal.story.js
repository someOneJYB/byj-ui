import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '../Modal';

let show = true


storiesOf('Modal', module)
    .add('基本用法',() => (
        <Modal show={true} cancel={()=>show=!show}/>
    ))
