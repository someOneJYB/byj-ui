import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './index.less'

class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'checked': props.checked
        }
    }


    onChange = () => {
        const { checked } = this.state;
        const { onChange } = this.props;
        this.setState({
            'checked': !checked
        }, () => {
            onChange && onChange(this.state.checked);
        })
    }


    render() {
      const { color = '#64bd63' } = this.props
      const checkedStyle = {
           'borderColor': color,
           'boxShadow': `${color} 0 0 0 16px inset`,
           'backgroundColor': color
      }
      const { checked } = this.state

return (
          <label>
              <input style={checked ? { ...checkedStyle } : { 'backgroundColor': '#fff' } } className="mui-switch" type="checkbox" checked={checked} onChange={this.onChange}/>
          </label>
      )
    }
}
Switch.propTypes = {
    'checked': PropTypes.bool,
    'onChange': PropTypes.func,
    'color': PropTypes.string
}
Switch.defaultProps = {
    'checked': false,
    'color': 'green'
}
export default Switch
