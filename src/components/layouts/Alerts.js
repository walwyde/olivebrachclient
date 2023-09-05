import React from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alerts = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => {
  // <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
  const {alertType, msg} = alert
  alertType === "success" ? toast.success(msg) : alertType === "info" ? toast.info(msg) : toast.error(msg)
})

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alerts
})

export default connect(mapStateToProps)(Alerts)
