import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAppointment } from "../../Actions/appointment";
import Moment from "react-moment";
import Loading from "../layouts/Loading";
import { init_convo } from "../../Actions/types";

const Appointment = ({
  getAppointment,
  appointment: { appointment, loading },
  match,
}) => {
  useEffect(() => {
    getAppointment(match.params.id);
  }, []);

  return loading ? (
    <Loading />
  ) : !loading && !appointment ? (
    <div>oops! cannot retrieve information..</div>
  ) : (!loading && !appointment.doctor) || (!loading && !appointment.user) ? (
    <Fragment>
      <div className="card center">
        <div className="card-content">
          <p className="card-title yellow-text">Cannot Hold</p>
          <span>
            <i className="material-icons red-text">error</i>
          </span>

          <p className="card-text">
            One or more participants absent from site...
          </p>
        </div>
        <div className="card-action center">
          <Link to="/appointments" className="card-link btn btn-primary btn-sm">
            {" "}
            Go Back{" "}
          </Link>
        </div>
      </div>
    </Fragment>
  ) : (
    !loading &&
    appointment && (
      <Fragment>
        <div className="center">
          <h3 className="center yellow-text">Appointment Details</h3>
        </div>
        <div
          style={
            appointment.status === "pending"
              ? { color: "#ccc" }
              : { color: "green" }
          }
          className="card"
        >
          <div className="card-content">
            <h3 className="card-title text-center">
              Appointment With{" "}
              <Link
                className="text-info"
                to={`/profile/${appointment.doctor._id}`}
              >
                {appointment.doctor.title.charAt(0).toUpperCase() +
                  appointment.doctor.title.slice(1).toLowerCase()}{" "}
                {appointment.doctor.user.fullname}
              </Link>
            </h3>
            <p className="card-title ">
              <span>Client:</span>{" "}
              <Link
                className=" text-info"
                to={`/profile/${appointment.user._id}`}
              >
                <span>{appointment.user.fullname}</span>
              </Link>
            </p>
            <hr />
            <p
              className={
                appointment.status === "pending"
                  ? "text-muted card-title"
                  : "card-title"
              }
            >
              Status: {appointment.status}
            </p>
            <p
              className={
                appointment.status === "pending"
                  ? "text-muted card-title"
                  : "card-title"
              }
            >
              Time: {appointment.time}
            </p>
            <p
              className={
                appointment.status === "pending"
                  ? "text-muted card-title"
                  : "card-title"
              }
            >
              Date: <Moment fromNow>{appointment.date}</Moment>
            </p>
            <p
              className={
                appointment.status === "pending"
                  ? "text-muted card-title"
                  : "card-title"
              }
            >
              Doctor's Contact: {appointment.doctor.phone}
            </p>
            <p
              className={
                appointment.status === "pending"
                  ? "text-muted card-title"
                  : "card-title"
              }
            >
              Doctor's Address: {appointment.doctor.address}
            </p>
          </div>

          <div className="card-action center">
            <Link
              to="/appointments"
              className="card-link btn btn-primary btn-sm"
            >
              {" "}
              Go Back{" "}
            </Link>
          </div>
        </div>
      </Fragment>
    )
  );
};

Appointment.propTypes = {
  getAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointment })(Appointment);
