import React from 'react';
import PropTypes from 'prop-types';

import './index.less'
const day31 = [1, 3, 5, 7, 8, 10, 12]
let y = new Date().getFullYear()
const yearList = []
const monthList = []
for (let i = 0; i < 50; i++) {
    yearList.push(y);
    y--;
}

for (let i = 1; i < 13; i++) {
    monthList.push(`${i}月`);
}


class Calender extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            'year': props.year,
            'month': props.month,
            'day': props.day,
            'visibleYear': false,
            'visibleMonth': false,
            'activeDay': props.activeDay
        }

    }

    componentDidMount() {
          this.week();
    }

    getStartYear = () => {
        const {
            year,
            month
        } = this.state
        const date = `${year}-${month}-01`;
        const week = new Date(Date.parse(date.replace(/\-/g, '/')));

return week.getDay()

    }

    getCommonDays = (month) => {
        if (day31.indexOf(month) > -1) {
            return 31
        }

return 30
    }

    week = () => {
        const { year, month, day, activeDay } = this.state;
        const result = [];
        const weekend = [];
        let last;
        if (month - 1 === 0) {
            last = this.getDays(year - 1, 12)
        } else {
            last = this.getDays(year, month - 1)
        }
        const allDay = this.getDays(year, month)
        const startDayWeek = this.getStartYear();
        const length = startDayWeek === 0 ? 7 : startDayWeek;
        for (let i = 0; i < length - 1; i++) {
            result.push({ 'num': last--,
'month': month - 1 })
        }
        result.reverse()
        result.push({ 'num': 1,
month });
        let activeItem;
        for (let i = 2; i <= allDay; i++) {
            result.push({ 'num': i,
month })
        }
        let index = 0
        for (let j = 0; j < result.length; j++) {
            if (j % 7 === 0 && j !== 0) {
 index++
}
            if (!weekend[index]) {
 weekend[index] = []
}
            if (activeDay === result[j].num) {
 activeItem = index
}
            weekend[index].push(result[j]);
        }
        if (!activeItem) {
 activeItem = 0
}
        // 添加额外的日历时间
        const l = weekend.length;
        let start = 1;
        if (weekend[l - 1].length < 7) {
            while (weekend[l - 1].length < 7) {
                weekend[l - 1].push({ 'num': start,
'month': month + 1 });
                start++
            }
        }
        // tODO 不执行是因为在constructor 中执行
        this.setState({
            'showDays': [...weekend],
            activeItem
        })
    }

    getDays = (year, month) => {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            if (month === 2) {
                return 29
            }

return this.getCommonDays(month)
        }
            if (month === 2) {
                return 28
            }

return this.getCommonDays(month)

    }

    chooseYear = (year) => {
        this.setState({
            year,
            'visibleYear': false
        }, () => {
 this.week(); this.onChange()
})
    }

    chooseMonth = (month) => {
        this.setState({
            'visibleMonth': false,
            'month': parseInt(month)
        }, () => {
 this.week(); this.onChange()
})
    }

    onChange = () => {
        const { onChange } = this.props;
        const { year, month, activeDay } = this.state
        onChange && onChange(`${year}-${month >= 10 ? month : `0${month}`}-${activeDay >= 10 ? activeDay : `0${activeDay}`}`)
    }

    setDay = (i, index, month) => {
        this.setState({
            'activeDay': i,
            'activeItem': index,
            month
        }, () => {
            this.onChange()
        })
    }


    render() {
        const { showDays = [], activeDay, year, month, activeItem = null, visibleYear = false,
            visibleMonth = false } = this.state;

return <div className="table-con">
            <div className="show-day">
                <div onClick={() => this.setState({
                    'visibleYear': true
                })}>年</div>
                <div>{`${year}年-${month}月-${activeDay}号`}</div>
                <div onClick={() => this.setState({
                    'visibleMonth': true
                })}>月</div>
            </div>
            <table>
                    <thead>
                        <tr className="calender-head">
                            <tr>-</tr>
                            <tr>二</tr>
                            <tr>三</tr>
                            <tr>四</tr>
                            <tr>五</tr>
                            <tr>六</tr>
                            <tr>日</tr>
                        </tr>
                    </thead>
                    <tbody>
            {
                showDays.map((item, index) => <tr className="calender-head" key={item[0]}>
                        {
                            item.map((i, idx) => <td onClick={(e) => this.setDay(i.num, index, i.month)}
                                                     className={i.num === activeDay &&
                                                     index === activeItem ? 'active' : ''}
                                                     key={idx}>{i.num}</td>)
                        }
                    </tr>)
            }
                </tbody>
            </table>
            {(visibleYear || visibleMonth) && <div className="mask-month">
                {
                    visibleYear && yearList.map((item) => <div onClick={() => this.chooseYear(item)} className="mask-item" key={item}>{item}</div>)
                }
                {
                    visibleMonth && monthList.map((item) => <div onClick={() => this.chooseMonth(item)} className="mask-item" key={item}>{item}</div>)
                }
            </div>}
            </div>
    }
}
Calender.propTypes = {
    'year': PropTypes.number,
    'month': PropTypes.number,
    'day': PropTypes.number,
    'activeDay': PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    'onChange': PropTypes.func
}
Calender.defaultProps = {
    'year': new Date().getFullYear(),
    'month': new Date().getMonth() + 1,
    'day': new Date().getDay(),
    'activeDay': new Date().getDate(),
    'onChange': null
};

export default Calender
