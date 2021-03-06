import React from 'react';
import PropTypes from 'prop-types';

import CityPicker from './CityPicker';
import MultiPicker from './MultiPicker'
import './index.less'

function swipeDirection (x1, x2, y1, y2) {
    if (Math.abs(x1 - x2) >= Math.abs(y1 - y2)) {
        return x1 - x2 > 0 ? 'Left' : 'Right'
    }

return y1 - y2 > 0 ? 'Up' : 'Down';
}
class Picker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'visible': props.visible || true,
            'data': props.data,
            'activeIndex': props.activeIndex || 0

        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            ...props
        })
    }

    start = (e) => {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
    }

    end = (e) => {
        this.endX = e.changedTouches[0].pageX;
        this.endY = e.changedTouches[0].pageY;
        const { data } = this.state
        const r = swipeDirection(this.startX, this.endX, this.startY, this.endY);
        let add = Math.floor(Math.abs(this.endY - this.startY) / 30)
        const { onChange } = this.props;
        add = add === 0 ? 1 : add
        if (r === 'Up') {
            let index = this.state.activeIndex + add;
            index = index > data.length ? data.length : index;
            onChange && onChange(index)
            console.log(index, data[index]);
            this.setState({
                'activeIndex': index
            })
        }
        if (r === 'Down') {
            let index = this.state.activeIndex - add;
            index = index < 0 ? 0 : index;
            console.log(index, data[index])
            onChange && onChange(index)
            this.setState({
                'activeIndex': index
            })
        }
    }

    close = () => {
        this.setState({
            'visible': false
        })
    }

    choose = () => {
        const { onChoose } = this.props;
        const { data, activeIndex } = this.state
        onChoose && onChoose(data[activeIndex], activeIndex)
        this.close()
    }


    render() {
        const { data, activeIndex, visible } = this.state;
        const l = 2 - activeIndex;
        if (!visible) {
            return null
        }
        console.log(l, 'l')

return <div>
            <ul className="picker-header">
                <li onClick={this.close}>取消</li>
                <li onClick={this.choose}>确定</li>
            </ul>
            <div className="picker-all">
            <div className="absolute-item"></div>
            <div className="picker-con" style={{ 'height': `${data.length * 30}px`,
'transform': `translate3d(0, ${l * 30}px, 0)` }} onTouchStart={this.start} onTouchEnd={this.end}>
                {
                    data.map((item) => <div key={item} className="picker-item">{item}</div>)
                }
            </div>
        </div>
        </div>
    }
}
Picker.propTypes = {
    'visible': PropTypes.bool,
    'data': PropTypes.array,
    'onChoose': PropTypes.func,
    'activeIndex': PropTypes.number,
    'onChange': PropTypes.func
}
Picker.defaultProps = {
    'visible': true,
    'data': [],
    'activeIndex': 0
}
Picker.MultiPicker = MultiPicker
Picker.CityPicker = CityPicker
export default Picker
