import React from 'react';
import { storiesOf } from '@storybook/react';
import Calender from '../Calender';

// import { withInfo } from '@storybook/addon-info';

storiesOf('Calender', module)
    .add('基本用法',() => (
        <Calender/>
    ))

