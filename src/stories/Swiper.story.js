import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DragLine from '../DragLine';


storiesOf('DragLine', module)
  .add('基本用法', (withInfo(`
    <DragLine direction={'col'} />
    `))(() => (
      <div>
        <DragLine direction="col" />
        <div style={{ margin: 20 }} />
        <DragLine direction="row" />
      </div>
  )));
