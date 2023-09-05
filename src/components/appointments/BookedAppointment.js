import React, { Fragment, useEffect } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import Loading from "../layouts/Loading";
import {
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
} from "../../Actions/appointment";

const BookedAppointment = ({
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
  appointment: { appointments, loading },
  profile: { profile, loading: profileLoading },
  auth: { authloading, user },
}) => {
  useEffect(() => {
    getBookedAppointments();
  }, []);

  return loading ? (
    <Loading />
  ) : (!loading && !appointments) || appointments.length === 0 ? (
    <Fragment>
      <h5 className="center yellow-text">No Appointments Yet</h5>
    </Fragment>
  ) : (
    !authloading &&
    user &&
    !loading &&
    appointments &&
    appointments.length > 0 && (
      <div>
        {appointments.map((appointment) => (
          <div
            style={{
              backgroundColor: "#faf9f9",
              color: "black",
              marginTop: "2rem",
            }}
            className="card center"
            key={appointment._id}
          >
            <div className="card-content">
              <p className="card-title">Status: {appointment.status}</p>
              <p className="card-text">Time: {appointment.time}</p>
              <p className="card-text">
                <Moment format="MMMM Do YYYY">{appointment.date}</Moment>
              </p>
            </div>
            <div className="card-action">
              <Link
                to={`/appointments/${appointment._id}`}
                className="btn-small left"
              >
                View Appointment
              </Link>
              {user && user.isStaff && (
                <div className="">
                  {appointment.status !== "approved" && (
                    <button
                      onClick={() => approveAppointment(appointment._id)}
                      className="btn-small center"
                    >
                      Approve Appointment
                    </button>
                  )}
                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    className="btn-small right red accent-4"
                  >
                    Delete Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  );
};

BookedAppointment.propTypes = {
  getBookedAppointments: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  approveAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointment: state.appointment,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getBookedAppointments,
  deleteAppointment,
  approveAppointment,
})(withRouter(BookedAppointment));
