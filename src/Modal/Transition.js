import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Transition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'show': false,
            'classes': null
        }
    }

    static defaultProps = {
        'animate': true,
        'show': false,
        'transitionName': '',
        'appearTimeout': 0,
        'appearActiveTimeout': 0,
        'appearEndTimeout': 0,
        'enterTimeout': 0,
        'enterActiveTimeout': 0,
        'enterEndTimeout': 0,
        'leaveTimeout': 0,
        'leaveEndTimeout': 0,
        'leaveActiveTimeout': 0
    }

    componentWillMount() {
        const { transitionName, animate, show } = this.props;
        if (!animate) {
            console.log('no animate')
            this.setState({ show })

return
        }
        this.appearAnimate(this.props, transitionName)
    }

    componentWillReceiveProps(props) {
        const { transitionName, animate, show } = props
        if (!animate) {
            this.setState({ show })

return
        }
        if (!props.show) {
            this.leaveAnimate(props, transitionName)
        } else {
            this.enterAnimate(props, transitionName)
        }
    }

    appearAnimate = (props, transitionName) => {
        const { show, appearTimeout, appearActiveTimeout, appearEndTimeout } = props
        const { initClasses, activeClasses, endClasses } = this.getClasses('appear', transitionName)
        this.setState({ show,
'classes': initClasses })
        setTimeout((_) => {
            this.setState({ 'classes': activeClasses })
        }, appearTimeout)
        setTimeout((_) => {
            this.setState({ 'classes': endClasses })
        }, appearActiveTimeout + appearTimeout)
        setTimeout((_) => {
            this.setState({ 'classes': '' })
        }, appearEndTimeout + appearActiveTimeout + appearTimeout)
    }

    enterAnimate = (props, transitionName) => {
        const { show, enterTimeout, enterActiveTimeout, enterEndTimeout } = props
        const { initClasses, activeClasses, endClasses } = this.getClasses('enter', transitionName)
        this.setState({ show,
'classes': initClasses })
        const enterTimer = setTimeout((_) => {
            this.setState({ 'classes': activeClasses })
            clearTimeout(enterTimer)
        }, enterTimeout)
        const enterActiveTimer = setTimeout((_) => {
            this.setState({ 'classes': endClasses })
            clearTimeout(enterActiveTimer)
        }, enterActiveTimeout + enterTimeout)
        const enterEndTimer = setTimeout((_) => {
            this.setState({ 'classes': '' })
            clearTimeout(enterEndTimer)
        }, enterEndTimeout + enterActiveTimeout + enterTimeout)
    }

    leaveAnimate = (props, transitionName) => {
        const { show, leaveTimeout, leaveActiveTimeout, leaveEndTimeout } = props
        const { initClasses, activeClasses, endClasses } = this.getClasses('leave', transitionName)
        this.setState({ 'classes': initClasses })
        const leaveTimer = setTimeout((_) => {
            this.setState({ 'classes': activeClasses })
            clearTimeout(leaveTimer)
        }, leaveTimeout)
        const leaveActiveTimer = setTimeout((_) => {
            this.setState({ 'classes': endClasses })
            clearTimeout(leaveActiveTimer)
        }, leaveActiveTimeout + leaveTimeout)
        const leaveEndTimer = setTimeout((_) => {
            this.setState({ show,
'classes': '' })
            clearTimeout(leaveEndTimer)
        }, leaveEndTimeout + leaveActiveTimeout + leaveTimeout)
    }

    getClasses = (type, transitionName) => {
        const initClasses = classnames({
            [`${transitionName}-appear`]: type === 'appear',
            [`${transitionName}-enter`]: type === 'enter',
            [`${transitionName}-leave`]: type === 'leave'
        })
        const activeClasses = classnames({
            [`${transitionName}-appear-active`]: type === 'appear',
            [`${transitionName}-enter-active`]: type === 'enter',
            [`${transitionName}-leave-active`]: type === 'leave'
        })
        const endClasses = classnames({
            [`${transitionName}-appear-end`]: type === 'appear',
            [`${transitionName}-enter-end`]: type === 'enter',
            [`${transitionName}-leave-end`]: type === 'leave'
        })

return { initClasses,
activeClasses,
endClasses }
    }


    cloneChildren = () => {
        const { classes } = this.state
        const { children } = this.props
        const { className } = children.props
        console.log(`${className} ${classes}`)

return React.cloneElement(
            children,
            { 'className': `${className} ${classes}` }
        )
    }


    render() {
        const { show } = this.state

return show && this.cloneChildren()
    }
}
Transition.propTypes = {
    'transitionName': PropTypes.string,
    'appearTimeout': PropTypes.number,
    'appearActiveTimeout': PropTypes.number,
    'appearEndTimeout': PropTypes.number,
    'enterTimeout': PropTypes.number,
    'enterActiveTimeout': PropTypes.number,
    'enterEndTimeout': PropTypes.number,
    'leaveTimeout': PropTypes.number,
    'leaveEndTimeout': PropTypes.number,
    'leaveActiveTimeout': PropTypes.number
}
Transition.defaultProps = {
    'transitionName': '',
    'appearTimeout': 0,
    'appearActiveTimeout': 200,
    'appearEndTimeout': 100,
    'enterTimeout': 0,
    'enterActiveTimeout': 200,
    'enterEndTimeout': 100,
    'leaveTimeout': 0,
    'leaveEndTimeout': 200,
    'leaveActiveTimeout': 100
}
export default Transition
