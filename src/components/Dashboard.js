import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./layouts/Loading";
import { deleteAccount, loadCurrentProfile } from "../Actions/profile";
import { loadNewMessages } from "../Actions/messaging";
import { getBookedAppointments } from "../Actions/appointment";

const Dashboard = ({
  deleteAccount,
  getBookedAppointments,
  loadNewMessages,
  loadCurrentProfile,
  auth: { loading: authloading, user },
  profile: { profile, loading },
}) => {
  React.useEffect(() => {
    loadNewMessages(!authloading && user && user._id)
    loadCurrentProfile();
    getBookedAppointments();
  }, [authloading, user, loadNewMessages, getBookedAppointments, loading]);

  const client = user && !user.isStaff;
  const staff = user && user.isStaff;

  return loading ? (
    <Loading />
  ) : !loading && !profile ? (
    <Fragment>
      <h1 className="center yellow-text">Dashboard</h1>
      <h4 className="lead">
        <i className="fas fa-user"></i> Welcome{" "}
        {user && user.fullname.split(" ")[0]}
      </h4>
      <hr />
      <p className="lead">
        <Link to="/create-profile" className="btn btn-primary">
          Create Profile
        </Link>
      </p>
    </Fragment>
  ) : !loading && !authloading && client && profile ? (
    <div>
      <h3 className="yellow-text center">Dashboard</h3>

      <div className="row">
        <div className="col s12 m6">
          <div className="card panel-card hoverable">
            <div className="card-image">
              <Link to={`/edit-avatar/${profile._id}`}>
                <img
                  src={`http://localhost:3001/${user.avatar}`}
                  alt="user"
                  className="responsive"
                />
              </Link>
            </div>
            <div className="card-content">
              <p className="card-title center">
                <span
                  style={{ position: "absolute", right: "3rem", top: 50 }}
                  className="badge yellow accent-4 "
                >
                  {profile.age}
                </span>
                {user.fullname}
              </p>
              <p className="card-text">{profile.bio}</p>
            </div>
            <div className="card-action center">
              <p className="red-text">Account Actions</p>

              <Link
                className="btn-small yellow darken-3 left"
                to={`/edit-profile/${profile._id}`}
              >
                Edit
              </Link>
              <Link
                onClick={() => deleteAccount()}
                className="btn-small red darken-3 right"
                to="#"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            border: "1px solid #ccc",
            padding: "0.5rem",
            color: "white",
            backgroundColor: "#01411C",
            marginTop: "2rem",
          }}
          className="col s12 m5 push-l1"
        >
          <span className="badge left red accent-4 white-text">Addiction</span>{" "}
          <h5>{user.addiction}</h5>
          <hr />
          <span className="badge left orange accent-4 white-text">History</span>
          <p>{profile.history}</p>
          <hr />
          <span className="badge left blue accent-4 white-text">Contact</span>
          <div>
            <p>
              <i className="material-icons left">phone</i>
              {profile.phone}
            </p>
            <p>
              <i className="material-icons left">email</i>
              {profile.email}
            </p>
            <p>
              <i className="material-icons left">pin</i>
              {profile.address}
            </p>
          </div>
          <hr />
          <span className="badge left blue white-text">Doctor</span>
          <div>
            <p>
              <i className="material-icons left">assignment_ind</i>
              {profile.docName}
            </p>

            <p>
              <i className="material-icons left">phone</i>
              {profile.docContact}
            </p>

            <p>
              <i className="material-icons left">pin</i>
              {profile.docAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    !loading &&
    !authloading &&
    staff &&
    profile && (
      <Fragment>
        <h4 className="center yellow-text">Staff DashBoard</h4>
        <div
          style={{ width: "500px", margin: "auto", marginTop: "2rem" }}
          className="center card panel-card hoverable"
        >
          <div className="card-image">
            <Link to={`/edit-avatar/${profile._id}`}>
              <img
                src={`http://localhost:3001/${user.avatar}`}
                alt="user"
                className="responsive"
                style={{ width: "100%" }}
              />
            </Link>
          </div>
          <div className="card-content">
            <p className="card-title center">
              <span
                style={{ position: "absolute", right: "3rem", top: 50 }}
                className="badge yellow accent-4 "
              >
                {profile.age}
              </span>
              <span>
                {profile.title.charAt(0).toUpperCase() + profile.title.slice(1)}
              </span>{" "}
              {user.fullname}
            </p>
            <p className="card-text">{profile.employer}</p>
            <p className="card-text">{profile.bio}</p>
            <p className="card-text">{profile.address}</p>
            <p className="card-text">{profile.email}</p>
            <p className="card-text">{profile.phone}</p>
          </div>
          <div className="card-action row">
            <div className="col s6">
              <Link
                className="btn-small yellow darken-3"
                to={`/edit-profile/${profile._id}`}
              >
                Edit
              </Link>
            </div>
            <div className="col s6">
              <Link
                onClick={() => deleteAccount()}
                className="btn-small red darken-3"
                to="#"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

Dashboard.propTypes = {
  loadCurrentProfile: PropTypes.func.isRequired,
  loadNewMessages: PropTypes.func.isRequired,
  getBookedAppointments: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadCurrentProfile, deleteAccount, loadNewMessages, getBookedAppointments })(
  Dashboard
);
