import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './index.less'


class Vertical extends Component {
    constructor(props) {
        super(props)
        this.timer = null;
        this.state = {
            'activeIndex': 0
        }
    }

    componentDidMount() {
        this.props.auto && this.autoPlay()
    }

    start = () => {
        const { auto, duration } = this.props;
        setTimeout(() => {
 auto && this.autoPlay()
}, duration * 1000 * 3.5)
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
        let { activeIndex } = this.state;
        const { direction } = this.state
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
                            'transform': 'translateY(0)'
                        }
                    }, () => this.start())
                }, durationTime)
            })


        } else {
            ++activeIndex;
            activeIndex = activeIndex > length - 1 ? 0 : activeIndex;
            if (activeIndex === 0) {
                if (parseInt(direction, 10) === 0) {
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
                                'transform': `translateY(${-1 * width}px)`
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
                        'transform': `translateY(${`${-length * width}px`})`
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
        const { imageList, duration } = this.props
        let { height } = this.props
        height = parseInt(height, 10);
        clearTimeout(this.excute);
        this.excute = setTimeout(() => {
            this.addIndex(height, imageList.length, duration)
        }, duration * 5000)
    }


    playInterVal = () => {
        if (this.stop) {
            return
        }
        let { activeIndex } = this.state;
        const { imageList } = this.props;
        let { width } = this.props
        width = parseInt(width, 10);
        if (activeIndex >= 0 <= imageList.length) {
            activeIndex++
        }
        if (activeIndex === imageList.length + 1) {
            this.setState({
                'activeIndex': 0,
                'extraStyle': {
                    'transition': 'none',
                    'transform': 'translateY(0)'
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
        if (window.cancelAnimationFrame) {
            cancelAnimationFrame(this.timer)
        } else {
            clearInterval(this.timer)
        }
    }

    touchEnd = (e) => {
        this.clearTimer()
        let { height } = this.props
        const { imageList, duration } = this.props
        const { length } = imageList
        this.endX = e.changedTouches[0].pageX;
        this.endY = e.changedTouches[0].pageY;
        const r = this.swipeDirection(
            this.startX,
            this.endX,
            this.startY,
            this.endY
        );
        height = parseInt(height, 10);
        if (r === 'Up') {
            return this.minusIndex(height, length, duration)
        }
        if (r === 'Down') {
            return this.addIndex(height, length, duration)
        }
    }


    swipeDirection = (x1, x2, y1, y2) => {
        if ((Math.abs(x1 - x2) >= Math.abs(y1 - y2))) {
            return x1 - x2 > 0 ? 'Left' : 'Right'
        }

return 1 - y2 > 0 ? 'Up' : 'Down';
    }


    render() {
        let { height, width } = this.props;
        const { dot, parentClass = '', duration, imageList = [] } = this.state;
        width = parseInt(width, 10);
        height = parseInt(height, 10);
        const { length } = imageList;
        const {
            direction = `${-height * (this.state.activeIndex + 1)}px`,
            extraStyle = {},
            activeIndex
        } = this.state;

        const item = imageList[imageList.length - 1];
        const item1 = imageList[0];
        const style = { 'height': `${parseInt(height, 10)}px`,
'width': `${parseInt(width, 10)}px` };

return (
            <div
                className={`con  ${parentClass}`}
                style={style}
                onTouchStart={this.touchStart}
                onTouchEnd={this.touchEnd}
                onTouchCancel={this.touchCancel}
            >
                <div className="bag-v"
                     style={{
                         'height': `${parseInt(height, 10) * (length + 2)}px`,
                         'transition': `transform ${duration}s ease-out`,
                         'transform': `translateY(${direction})`,
                            ...extraStyle
                     }}
                >
                    <div key={imageList.length}
                         className={`son  ${item.classy}`}
                         style={{
                            'backgroundImage': `url(${item.url})`,
                            ...item.style,
                            height,
                            width
                         }}
                    >
                        {item.children || null}
                    </div>
                    {
                        imageList.map((
                            {
                                url = '',
                                style = {},
                                classy = '',
                                children = ''
                            },
                            index
                        ) => <div
                                key={url || index}
                                className={`son  ${classy}`}
                                style={
                                    {
                                        'backgroundImage': `url(${url})`,
                                        ...style,
                                        height,
                                        width
                                    }
                                }
                        >
                                 {children}
                            </div>)
                    }
                    <div key={-1}
                         className={`son  ${item1.classy}`}
                         style={{
                            'backgroundImage': `url(${item1.url})`,
                            ...item1.style,
                            height,
                            width
                         }}>
                        {item1.children || null}
                    </div>
                </div>
                {
                    dot && <ul className="dot-con-v">
                        {
                            imageList.map((it, index) => <li
                                    onClick={() => this.goto(index)}
                                    key={index}
                                    className={
                                        `dot 
                                        ${
                                            (activeIndex % length) === index
                                                ? 'active'
                                                : ''
                                        }
                                        `
                                    }
                                />)
                        }
                    </ul>
                }
            </div>
        )
    }
}
Vertical.propTypes = {
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
Vertical.defaultProps = {
    'imageList': [],
    'duration': 0.6,
    'dot': false,
    'auto': false,
    'height': 300,
    'width': 300
};
export default Vertical
