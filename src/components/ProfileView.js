import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/layouts/Loading";
import { getProfileById } from "../Actions/profile";

const Dashboard = ({
  profile: { loading, profile },
  auth: { loading: authloading, user },
  match: { params },
  getProfileById,
}) => {
  React.useEffect(() => {
    getProfileById(params.id);
  }, [params, getProfileById, loading]);
  return loading ? (
    <Loading />
  ) : !loading && !profile ? (
    <div>
      <Link
        style={{ marginTop: "2rem" }}
        to="#"
        onClick={() => window.history.back()}
        className="btn yellow darken-3"
      >
        Go Back
      </Link>
      <h3 className="yellow-text center">Profile View</h3>
      <div className="card hoverable center">
        <div className="card-title">
          <p className="flow-text">
            <i className="material-icons">error</i> No profile found
          </p>
        </div>
        <div className="card-content">
          <p> This user does not have a profile</p>
        </div>
        <div className="card-action">
          <Link
            to="#"
            onClick={() => window.history.back()}
            className="btn yellow darken-3"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  ) : !loading &&
    !authloading &&
    profile &&
    profile.user &&
    profile.user.isStaff ? (
    <div>
      <Link
        style={{ marginTop: "2rem" }}
        to="#"
        onClick={() => window.history.back()}
        className="btn yellow darken-3"
      >
        Go Back
      </Link>
      <h3 className="yellow-text center">Profile View</h3>

      <div className="">
        <div>
          <div className="card" style={{ width: "60%", margin: "auto" }}>
            <div
              className="card-image"
              style={{
                height: "25rem",
                width: "100%",
                overflowY: "hidden",
                marginBottom: "1rem",
              }}
            >
              <img
                src={`http://localhost:3001/${profile.user.avatar}`}
                alt="user"
                className="responsive"
                style={{ height: "100%", width: "100%" }}
              />
              <Link
                to={`/messages/${profile.user._id}`}
                className="btn-floating pulse halfway-fab"
              >
                <i className="material-icons">message</i>
              </Link>
            </div>
            <div className="card-content center">
              <p className="card-title center">
                {profile.title.charAt(0).toUpperCase() +
                  profile.title.slice(1).toLowerCase() +
                  " " +
                  profile.user.fullname}
              </p>
              <hr />
              <ul>
                <li>
                  <p className="card-text">Bio: {profile.bio}</p>
                </li>
                <li>
                  <p className="card-text">Address: {profile.address}</p>
                </li>
                <li>
                  <p className="card-text">Phone: {profile.phone}</p>
                </li>
                <li>
                  <p className="card-text">Email: {profile.user.email}</p>
                </li>
                <li>
                  <p className="card-text">Employer: {profile.employer}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    !loading &&
    profile &&
    !profile.user.isStaff && (
      <div>
         <Link
          style={{ marginTop: "2rem" }}
          to="#"
          onClick={() => window.history.back()}
          className="btn yellow darken-3"
        >
          Go Back
        </Link>
        <h3 className="yellow-text center">Profile View</h3>
        <div
          className="row center"
          style={{
            backgroundColor: "#01411C",
            padding: "1rem",
            color: "white",
          }}
        >
          <div className="col-s12 m3">
            <Link to={`/edit-avatar/${profile.user._id}`}>
              <img
                src={`http://localhost:3001/${profile.user.avatar}`}
                alt="profile_avatar"
                className="responsive-img circle"
              />
            </Link>

            <div
              style={{
                padding: "0.5rem",
                fontSize: "1.5rem",
                margin: "1rem auto",
                width: "80%",
                border: "0.25rem solid #009000",
                borderRadius: "0.5rem",
              }}
              className="green lighten-2 yellow-text"
            >
              {profile.user.fullname}
            </div>
          </div>
          <div className="col s12 m12">
            <span className="badge left red accent-4 white-text">
              Addiction
            </span>{" "}
            <p>{profile.user.addiction}</p>
            <hr />
            <span className="badge left purple accent-4 white-text">
              Gender
            </span>{" "}
            <p>{profile.gender}</p>
            <hr />
            <span className="badge left green accent-4 white-text">
              Age
            </span>{" "}
            <p>{profile.age}</p>
            <hr />
            <span className="badge left orange accent-4 white-text">
              History
            </span>
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
            <span className="badge left blue white-text">doctor</span>
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
    )
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Dashboard);
