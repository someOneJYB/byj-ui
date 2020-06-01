import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Picker from '../Picker';

const { MultiPicker } = Picker;
const { CityPicker } = Picker;
const data = [
  {
    label: '辽宁',
    value: '辽宁',
    children: [
      {
        label: '阜新',
        value: '阜新',
        children: [
          {
            label: '阜蒙县',
            value: '阜蒙县',
          }, {
            label: '长春401',
            value: '长春4652',
          },
        ],
      },
      {
        label: '长春41',
        value: '长春4652',
        children: [
          {
            label: '长春78',
            value: '长春78',
            children: [
              {
                label: '阜蒙455县',
                value: '阜蒙345r4县',
              }, {
                label: '长r4r春41',
                value: '长春frfgrf4652',
              },
            ],
          }, {
            label: '长春41',
            value: '长春4652',
            children: [
              {
                label: '阜蒙32eddef3县',
                value: '阜33dd蒙县',
              }, {
                label: '2234长春41',
                value: 'nfknvi长春4652',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '吉林',
    value: '吉林',
    children: [
      {
        label: '长春',
        value: '长春',
        children: [
          {
            label: '长春7678',
            value: '长春7898',
          },
          {
            label: '长春412',
            value: '长春124652',
          },
        ],
      }, {
        label: '长春57hjj1',
        value: '长春5jj2',
        children: [
          {
            label: '长春738',
            value: '长春758',
          },
          {
            label: '长春4113',
            value: '长春4652',
          },
        ],
      },
    ],
  },
  {
    label: '辽神经宁',
    value: '辽神经宁',
    children: [
      {
        label: '很多歌阜新',
        value: '阜返回日本呢新',
        children: [
          {
            label: '阜我今日发蒙县',
            value: '阜吃恶化蒙县',
          }, {
            label: '长春4黑我哈1',
            value: '长春4发聂风652',
          },
        ],
      },
      {
        label: '长春无任41',
        value: '长春南',
        children: [
          {
            label: '长春7如8',
            value: '长春发聂好78',
            children: [
              {
                label: '133金额',
                value: '阜蒙345r4县',
              }, {
                label: '长纷纷r4r春41',
                value: '长春',
              },
            ],
          },
          {
            label: 'jkgh金额',
            value: '蒙345r4县',
          },
          {
            label: '长春你1',
            value: '长春啊',
            children: [
              {
                label: '阜哦县',
                value: '阜33dd蒙县',
              }, {
                label: '再来',
                value: 'nk春4652',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '西安',
    value: '西安',
    children: [
      {
        label: '不知道',
        value: '位置',
        children: [
          {
            label: '奇葩',
            value: '脾气啊哈',
          }, {
            label: '我白',
            value: '我猜哪期',
          },
        ],
      },
      {
        label: '很奇怪',
        value: '很大声',
        children: [
          {
            label: '这会打败你',
            value: '你哈',
            children: [
              {
                label: '呵呵呵',
                value: '呵呵呵',
              }, {
                label: '预期',
                value: '长区域',
              },
            ],
          }, {
            label: '长春你的海',
            value: '长气氛好',
            children: [
              {
                label: '哈克了',
                value: '你嘴里',
              }, {
                label: '大咸阳1',
                value: '我不知',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '辽123e宁',
    value: 'cerqs辽宁',
    children: [
      {
        label: '3rtg4t阜新',
        value: 'mkmgv阜新',
        children: [
          {
            label: 'rogo5阜蒙县',
            value: 'oiorkmf阜蒙县',
          }, {
            label: '434长春41',
            value: '00长春4652',
          },
        ],
      },
      {
        label: '长jgfogj春41',
        value: '长nvjrnvnv春4652',
        children: [
          {
            label: '9094039长春78',
            value: 'bjcbfub长春78',
            children: [
              {
                label: 'i4jr08阜蒙455县',
                value: '345r4县',
              }, {
                label: '长r4r春41',
                value: '4652',
              },
            ],
          }, {
            label: '春41',
            value: '长9032',
            children: [
              {
                label: '阜蒙',
                value: '阜县',
              }, {
                label: '2234长434',
                value: 'nfknv2',
              },
            ],
          },
        ],
      },
    ],
  },
];
const data2 = [
  [{ label: '夜的第一张', value: '夜的第一张' }, { label: '夜的第二张', value: '夜的第二张' }, { label: '夜的第三张', value: '夜的第三张' }, { label: '夜的第四张', value: '夜的第四张' }, { label: '夜的第五张', value: '夜的第五张' }, { label: '夜的第六张', value: '夜的第六张' }, { label: '夜的第八张', value: '夜的第八张' }], [{ label: '春', value: '春' }, { label: '夏', value: '夏' }, { label: '秋', value: '秋' }, { label: '冬', value: '冬' }],
];
const d3 = [
  '夜的第一张', '夜的第二张', '夜的第三张', '夜的第四张', '夜的第五张', '夜的第六张', '夜的第八张',
];

storiesOf('Picker', module)
  .add('基本用法', (withInfo(`
    只支持在移动端使用同时在CityPicker中必须改变传递的value
    ~~~js
        import Picker from 'Picker';
        
        
                const MultiPicker = Picker.MultiPicker
                const CityPicker = Picker.CityPicker
      
                <div>
                    <CityPicker value={[]} data={data}/>
                    <MultiPicker value={[0,0]} data={data2}/>
                    <Picker data={d3} value={0}/>
                </div>
      ~~~
    `))(() => (
      <div>
        <CityPicker value={[]} data={data} />
        <MultiPicker value={['夜的第一张', '春']} data={data2} />
        <Picker data={d3} value={0} />
      </div>
  )));
