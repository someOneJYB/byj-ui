import React from 'react';
import { storiesOf } from '@storybook/react';
import VerticalCarousal from '../VerticalCarousal';
import Carousel from "../Carousel";


storiesOf('VerticalCarousel', module)
    .add('基本用法',() => (
        <div>
            <VerticalCarousal width={'50px'} height={'20px'} imageList={[
                { style: {
                        backgroundColor: '#fff',

                    },
                    children: <div style={{textAlign: 'center'}}>户籍华</div>
                },
                { style:{
                        backgroundColor: '#fff',

                    },
                    children: <div style={{textAlign: 'center'}}>等小华</div>

                },
                { style:{
                        backgroundColor: '#fff',

                    },
                    children: <div style={{textAlign: 'center'}}>王小华</div>
                },
                { style:{
                        backgroundColor: '#fff',

                    },
                    children: <div style={{textAlign: 'center'}}>大傻子</div>
                }
            ]} auto duration={0.3}/>
            <div></div>
            <VerticalCarousal imageList={[
                { style: {
                        backgroundColor: 'red'
                    } },
                { style:{
                        backgroundColor: 'green'
                    },

                },
                { style:{
                        backgroundColor: 'yellow'
                    },

                },
                { style:{
                        backgroundColor: 'pink'
                    },

                }
            ]} width={'300px'} height={'200px'} duration={0.6} dot auto/>
        </div>
    ))
