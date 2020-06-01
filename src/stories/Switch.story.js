import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Switch from '../Switch';


storiesOf('Switch', module)
  .add('基本用法', (withInfo('<Switch color="blue" />'))(() => <Switch color="blue" />));
