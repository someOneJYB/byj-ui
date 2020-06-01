import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Modal from '../Modal';

let show = true;


storiesOf('Modal', module)
  .add('基本用法', (withInfo(`
也可以使用Transition 组件做动画搭配自己设定的 css
~~~
.transitionName-enter {
  transform: scale(0);
}

.transitionName-enter-active {
  transform: scale(1.1);
  transition: all .2s linear;
}

.transitionName-enter-end {
  transform: scale(1);
  transition: all .1s linear;
}

.transitionName-leave {
  transform: scale(1);
}

.transitionName-leave-active {
  transform: scale(1.1);
  transition: all .1s linear;
}

.transitionName-leave-end {
  transform: scale(0);
  transition: all .2s linear;
}
~~~
~~~js
 <Transition show={this.state.show}
                                    transitionName="modal"
                                    enterActiveTimeout={200}
                                    enterEndTimeout={100}
                                    leaveActiveTimeout={100}
                                    leaveEndTimeout={200}
                        >
                            <div className="modal">
                                <div className="modal-title">这是modal标题</div>
                                <div className="modal-content">这是modal内容</div>
                                <div className="modal-operator">
                                    <button className="modal-operator-close" onClick={this.cancel}>取消</button>
                                    <button className="modal-operator-confirm" onClick={this.confirm}>确认</button>
                                </div>
                            </div>
                        </Transition>
~~~
~~~js
    <Modal show={true} cancel={()=>show=!show}/>
    ~~~
    `))(() => (
      <Modal show cancel={() => show = !show} />
  )));
