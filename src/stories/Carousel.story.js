import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Carousel from '../Carousel';
import md from '../Carousel/README.md';


storiesOf('Carousel', module)
  .add('基本用法', withInfo(`${md}`)(() => (
    <div>
      <Carousel
        imageList={[
          {
            style: {
              backgroundColor: 'red',
            },
          },
          {
            style: {
              backgroundColor: 'green',
            },

          },
          {
            style: {
              backgroundColor: 'yellow',
            },

          },
          {
            style: {
              backgroundColor: 'pink',
            },

          },
        ]}
        width="300px"
        height="200px"
        duration={0.6}
        dot
        auto
      />
      <div style={{ margin: 20 }} />
      <Carousel
        width="50px"
        height="20px"
        imageList={[
          {
            style: {
              backgroundColor: 'red',

            },
            children: '李晓明',
          },
          {
            style: {
              backgroundColor: 'green',

            },
            children: '马小跳',

          },
          {
            style: {
              backgroundColor: 'yellow',

            },
            children: '王小华',
          },
          {
            style: {
              backgroundColor: 'pink',

            },
            children: '大傻子',
          },
        ]}
        dot
        duration={0.4}
        auto
      />
    </div>
  )));
