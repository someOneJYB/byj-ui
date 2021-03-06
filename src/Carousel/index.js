import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './index.less'

//
// 缓动数据：动画 transition 的的一半是延迟展示的时间,
// 需要明确的
//
class Carousel extends Component {
   constructor(props) {
       super(props)
       this.timer = null;
       this.state = {
           'activeIndex': 2
       }
   }


   start = () => {
       const { auto, duration } = this.props
       setTimeout(() => {
            auto && this.autoPlay()
       }, duration * 1000 * 3.5)
   }

   componentDidMount() {
       const { auto } = this.props
       auto && this.autoPlay()
   }

   touchStart = (e) => {
       this.clearTimer()
       this.startX = e.touches[0].pageX;
       this.startY = e.touches[0].pageY;
   }

   componentWillUnmount() {
       this.clearTimer()
   }

    autoPlay = () => {
       this.stop = false;
       const { duration } = this.props;
        if (window.requestAnimationFrame) {
            return this.timer = requestAnimationFrame(this.playWithRaf)
        }
            this.timer = setInterval(() => {
 this.playInterVal()
}, duration * 1000 * 3)

   }

   addIndex = (width, length, duration) => {
           let { activeIndex, direction } = this.state;
           const durationTime = duration * 0.8 * 1000
           if (activeIndex === length - 2) {
               activeIndex++
               this.setState({
                   activeIndex,
                   'direction': `${-(activeIndex + 1) * width}px`,
                   'extraStyle': {}
               }, () => {
                        setTimeout(() => {
                            this.setState({
                                'direction': '0px',
                                'extraStyle': {
                                    'transition': 'none',
                                    'transform': 'translate(0)'
                                }
                        }, () => this.start())
                   }, durationTime)
               })


           } else {
               ++activeIndex;
               activeIndex = activeIndex > length - 1 ? 0 : activeIndex;
               if (activeIndex === 0) {
                   if (parseInt(direction) === 0) {
                       this.setState({
                           activeIndex,
                           'direction': `${-(activeIndex + 1) * width}px`,
                           'extraStyle': {}
                       }, () => this.start())
                   } else {
                       this.setState({
                           activeIndex,
                           'direction': `${-(length + 1) * width}px`,
                           'extraStyle': {}
                       }, () => {
                           setTimeout(() => this.setState({
                               'extraStyle': {
                                   'transition': 'none',
                                   'transform': `translate(${-1 * width}px)`
                               }
                           }, () => this.start()), durationTime)
                       })
                   }

               } else {
                   this.setState({
                       activeIndex,
                       'direction': `${-(activeIndex + 1) * width}px`,
                       'extraStyle': {}
                   }, () => this.start())
               }

           }
   }


   minusIndex = (width, length, duration) => {
           let { activeIndex } = this.state;
           const durationTime = duration * 0.8 * 1000
           if (activeIndex === 0) {
               activeIndex = length - 1;
               this.setState({
                   activeIndex,
                   'direction': '0px',
                   'extraStyle': {}
               }, () => setTimeout(() => this.setState({
                       activeIndex,
                       'direction': `${-length * width}px`,
                       'extraStyle': {
                           'transition': 'none',
                           'transform': `translate(${`${-length * width}px`})`
                       }
                   }, () => this.start()), durationTime));

           } else {
               activeIndex--
               activeIndex = activeIndex < 0 ? 0 : activeIndex;
               this.setState({
                   activeIndex,
                   'extraStyle': {},
                   'direction': `${-(activeIndex + 1) * width}px`
               }, () => {
                   this.start();
               })
           }
   }

   playWithRaf = () => {
       if (this.stop) {
 return
}
       let { width, imageList, duration } = this.props
       width = parseInt(width);
       clearTimeout(this.excute)
       this.excute = setTimeout(() => {
           this.addIndex(width, imageList.length, duration)
       }, duration * 5000)
   }


   playInterVal = () => {
       if (this.stop) {
 return
}
       let { activeIndex } = this.state;
       let { width, imageList } = this.props
       width = parseInt(width);
       console.log(activeIndex)
       if (activeIndex >= 0 <= imageList.length) {
           activeIndex++
       }
       if (activeIndex === imageList.length + 1) {
           this.setState({
               'activeIndex': 0,
               'extraStyle': {
                   'transition': 'none',
                   'transform': 'translate(0)'
               }
           }, () => this.start())

return;
       }

       this.setState({
           activeIndex,
           'extraStyle': {},
           'direction': `${-activeIndex * width}px`
       }, () => this.start())
   }

   clearTimer = () => {
       clearTimeout(this.excute);
       this.stop = true;
       // console.log(this.stop)
       if (!window.cancelAnimationFrame) {
           clearInterval(this.timer)
       } else {
           cancelAnimationFrame(this.timer)
       }
   }

   goto = (index) => {
       // this.clearTimer()
       // let { width } = this.props
       // width = parseInt(width);
       // this.setState({
       //     activeIndex: index,
       //     direction: -index*width+'px',
       //     extraStyle: {}
       // },()=>{
       //     this.start()
       // })
   }

   touchEnd = (e) => {
       this.clearTimer()
       let { width, imageList, duration } = this.props
       const { length } = imageList
       this.endX = e.changedTouches[0].pageX;
       this.endY = e.changedTouches[0].pageY;
       const r = this.swipeDirection(this.startX, this.endX, this.startY, this.endY);
       width = parseInt(width);
       if (r === 'Right') {
           return this.minusIndex(width, length, duration)
       }
       if (r === 'Left') {
           return this.addIndex(width, length, duration)
       }
   }


    swipeDirection (x1, x2, y1, y2) {
        if (Math.abs(x1 - x2) > 80) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
        }

return 'Nochange';


    }


    render() {
       let { imageList = [], parentClass = '', height, width, dot, duration } = this.props;
       width = parseInt(width);
       height = parseInt(height)
       const { length } = imageList
       const { direction = `${-width * (this.state.activeIndex + 1)}px`, extraStyle = {}, activeIndex } = this.state;

        const item = imageList[imageList.length - 1]
        const item1 = imageList[0]
       const style = { 'height': `${parseInt(height)}px`,
'width': `${parseInt(width)}px` }

return (
           <div className={`con  ${parentClass}`} style={style} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchCancel={this.touchCancel}>
               <div className="bag" style={{ 'width': `${parseInt(width + 2) * length}px`,
'transition': `transform ${duration}s ease-out`,
'transform': `translateX(${direction})`,
...extraStyle }}>
                   <div key={imageList.length} className={`son  ${item.classy}`} style={{ 'backgroundImage': `url(${item.url})`,
...item.style,
width }}>{item.children || null}</div>
                {
                    imageList.map(({ url = '', style = {}, classy = '', children }, index) => <div key={url || index} className={`son  ${classy}`} style={{ 'backgroundImage': `url(${url})`,
...style,
width }}>{children || null}</div>)
                }
                   <div key={-1} className={`son  ${item1.classy}`} style={{ 'backgroundImage': `url(${item1.url})`,
...item1.style,
width }}>{item1.children || null}</div>
               </div>
               {
                   dot && <ul className="dot-con">
                       {
                           imageList.map((item, index) => <li onClick={(e) => this.goto(index)} key={index} className={`dot-icon ${activeIndex % length === index ? 'active' : ''}`}></li>)
                       }
                   </ul>
               }
           </div>
       )
    }
}
Carousel.propTypes = {
    'dot': PropTypes.bool,
    'auto': PropTypes.bool,
    'duration': PropTypes.number,
    'height': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    'width': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    'imageList': PropTypes.array
}
Carousel.defaultProps = {
    'imageList': [],
    'duration': 0.6,
    'dot': false,
    'auto': false,
    'height': 300,
    'width': 300
};
export default Carousel
