import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const ErrorMessage = ({errmessage}) => {

  return {
    errmessage
  }
}

ErrorMessage.propTypes = {
  errmessage: PropTypes.string
}

const mapStateToProps = state => ({
  errmessage: state.errors.errmessage
})
export default connect(mapStateToProps)(ErrorMessage)