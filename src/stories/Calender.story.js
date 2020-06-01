import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import md from '../Calender/README.md';
import Calender from '../Calender';

storiesOf('Calender', module)
  .add('基本用法',
    withInfo(`${md}`)(() => <Calender />));
