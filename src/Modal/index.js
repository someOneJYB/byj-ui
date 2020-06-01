
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Transition from './Transition'
import NewPortral from './NewPortral'
import './index.less'

//
// 缓动数据：动画 transition 的的一半是延迟展示的时间
//
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'show': props.show
        }
    }

    static defaultProps = {
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
        'leaveActiveTimeout': 0,
        'cancel': null,
        'confirm': null
    }

    close = () => {
        this.setState({
            'show': false
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.show !== prevState.show) {
            return {
                'show': nextProps.show
            }
        }

return null
    }

    componentWillReceiveProps(props) {
        this.setState({ 'show': props.show })
    }

    cancel = () => {
        const { cancel } = this.props;
        this.close();
        cancel && cancel()
    }


    confirm = () => {
        const { confirm } = this.props;
        this.close();
        confirm && confirm()
    }


    render() {
                return (
                    <NewPortral>
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
                    </NewPortral>
                )
            }


}
Modal.propTypes = {
    'show': PropTypes.bool,
    'transitionName': PropTypes.string,
    'appearTimeout': PropTypes.number,
    'appearActiveTimeout': PropTypes.number,
    'appearEndTimeout': PropTypes.number,
    'enterTimeout': PropTypes.number,
    'enterActiveTimeout': PropTypes.number,
    'enterEndTimeout': PropTypes.number,
    'leaveTimeout': PropTypes.number,
    'leaveEndTimeout': PropTypes.number,
    'leaveActiveTimeout': PropTypes.number,
    'cancel': PropTypes.func,
    'confirm': PropTypes.func
}
Modal.defaultProps = {
    'show': false,
    'transitionName': '',
    'appearTimeout': 0,
    'appearActiveTimeout': 200,
    'appearEndTimeout': 100,
    'enterTimeout': 0,
    'enterActiveTimeout': 200,
    'enterEndTimeout': 100,
    'leaveTimeout': 0,
    'leaveEndTimeout': 200,
    'leaveActiveTimeout': 100,
    'cancel': null,
    'confirm': null
}
Modal.Transition = Transition
export default Modal
