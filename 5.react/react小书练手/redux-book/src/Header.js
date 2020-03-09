
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux.js'

export class Header extends Component {
    static propTypes = {
        themeColor: PropTypes.string
      }
    

    render() {
        return (
            <h1 style={{ color: this.props.themeColor }}>React.js小书</h1>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      themeColor: state.themeColor
    }
  }
export default connect(mapStateToProps)(Header)

