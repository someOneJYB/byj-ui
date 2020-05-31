import React from 'react';
import { storiesOf } from '@storybook/react';
import Switch from '../Switch';


storiesOf('Switch', module)
    .add('基本用法',() => (
        <Switch color="blue" />
    ))
