import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "../common/Form";
import { Loading } from "../layouts/Loading";
import { getProfileById, editProfile } from "../../Actions/profile";
import { loadUser } from "../../Actions/auth";

class CreateProfile extends Form {
  state = {
    user: {},
    data: {
      fullname: "",
      history: "",
      age: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      docName: "",
      docAddress: "",
      docContact: "",
    },
    errors: {},
  };
  async componentDidMount() {
    console.log(this.props);
    const user = await this.props.loadUser();
    const profile = await this.props.getProfileById(this.props.match.params.id);
    console.log(user);

    await this.setState({
      user: user.data,
      data: {
        _id: profile._id,
        fullname: profile.fullname,
        history: profile.history,
        age: profile.age,
        gender: profile.gender,
        address: profile.address,
        phone: profile.phone,
        email: profile.email,
        docName: profile.docName,
        docAddress: profile.docAddress,
        docContact: profile.docContact,
      },
    });
  }

  Schema = {
    _id: Joi.string().label("ID"),
    history: Joi.string().required().label("Addiction History"),
    age: Joi.number().required().max(60).label("Age"),
    fullname: Joi.string().required().label("Full Name"),
    gender: Joi.string().required().label("Gender"),
    address: Joi.string().required().label("Address"),
    phone: Joi.number().required().label("Your Phone Number"),
    email: Joi.string().required().label("Your Email"),
    docName: Joi.string().required().label("Your Doctor's Name"),
    docAddress: Joi.string().required().label("Your Doctor's Address"),
    docContact: Joi.string().required().label("Your Doctor's Contact"),
  };
  doSubmit = () => {
    const profileId = this.props.match.params.id;
    console.log(profileId);
    this.props.editProfile(this.state.data, profileId);
    this.props.history.push("/dashboard");
  };
  render() {
    console.log(this.state.user);
    const { user } = this.state;
    const { data } = this.state;

    if (!user) return <Loading />;

    if (user && user.isStaff) {
      return <Redirect to={`/edit-staff-profile/${data._id} `} />;
    }

    return (
      <div>
        <Link
          style={{ marginTop: "2rem" }}
          to="#"
          onClick={() => window.history.back()}
          className="btn yellow darken-3"
        >
          Go Back
        </Link>
        <h3 className="center yellow-text">Edit User Profile</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderInput("history", "Addiction History", "text")}
          {this.renderInput("age", "age", "number")}
          {this.renderInput("fullname", "fullname", "text")}
          {this.renderInput("gender", "gender", "text")}
          {this.renderInput("address", "address", "text")}
          {this.renderInput("phone", "phone", "number")}
          {this.renderInput("email", "email", "email")}
          {this.renderInput("docName", "Doctor's Name", "text")}
          {this.renderInput("docAddress", "Doctor's Address", "text")}
          {this.renderInput("docContact", "Doctor's Contact", "text")}

          {this.renderButton("submit", "btn")}
        </form>
      </div>
    );
  }
}

CreateProfile.defaultProps = {
  getProfileById: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfileById,
  editProfile,
  loadUser,
})(CreateProfile);
