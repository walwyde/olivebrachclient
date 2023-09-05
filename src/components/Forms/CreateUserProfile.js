import React from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "../common/Form";
import { createProfile } from "../../Actions/profile";
import { loadUser } from "../../Actions/auth";
import { connect } from "react-redux";
import Loading from "../layouts/Loading";

class CreateProfile extends Form {
  async componentDidMount() {
    const user = await this.props.loadUser();
    this.setState({ user: user.data });
    console.log(user);
  }

  state = {
    user: null,
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

  Schema = {
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
    // console.log(this.state.data);
    this.props.createProfile(this.state.data, this.props.history);
  };
  render() {
    const { user } = this.state;
    console.log(user);

    if (!user) return <Loading />;

    if (user && user.isStaff) {
      return <Redirect to="/create-staff-profile" />;
    }

    return (
      <div>
        <h3 className="center yellow-text">Create Profile</h3>
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

          {this.renderButton("submit", "btn-small")}
        </form>
      </div>
    );
  }
}

createProfile.defaultProps = {
  createProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile, loadUser })(
  CreateProfile
);
