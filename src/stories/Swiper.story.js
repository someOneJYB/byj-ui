import React from 'react';
import { storiesOf } from '@storybook/react';
import DragLine from '../DragLine';


storiesOf('DragLine', module)
    .add('基本用法',() => (
        <div>
            <DragLine direction={'col'} />
            <div style={{ margin: 20 }}></div>
            <DragLine direction={'row'} />
        </div>
    ))
