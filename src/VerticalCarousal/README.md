### 组件写的时候需要考虑的问题
- 内部 state
- 外界 props
- 操作逻辑而确定的事件函数
- 堆砌html设计DOM结构并搭建出雏形

规则：尽量通用不做业务逻辑的处理，通过触发事件逻辑通知外界组件实现业务逻辑，并修改组件props


### 例如在写轮播组件的时候
#### state
- 使用索引记住活跃的图片
- 计算移动的位移
#### props
- 外界的轮播组件的 data 进行展示
- 是否自动播放
- 是否支持点索引
- 动画 duration
#### 事件函数
- 移动端使用使用 touchStart 和 touchMove 记录位置并计算是否发生移动
- 在首尾接入首尾两张图片做过渡动画
- 在 duration 结束后，移除动画效果做替补位移，需要延迟因为等待transition结束快速过度
- 计算index防止index过界
#### 设计骨架
- 轮播思想就是使用 transform 属性改变图片位置
#### 树组件通过使用 Tree 和 TreeNode 两种元素使用，主要是通过 TreeNode 包裹的要渲染的元素，然后获取需要得到的平铺数据结构，然后在变化的时候直接找到数据结构对应的 key
