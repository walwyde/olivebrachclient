import React from "react";
import PropTypes from 'prop-types';
import Form from "../common/Form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { register } from "../../Actions/auth";
import {connect} from 'react-redux'

class Register extends Form {
  state = {
    data: {
      fullname: "",
      email: "",
      address: "",
      phone: "",
      addiction: "",
      password: "",
      password2: "",
    },
    errors: {},
  };

  Schema = {
    fullname: Joi.string().required().min(4).max(25).label("Full Name"),
    email: Joi.string().required().label("Email"),
    address: Joi.string().required().label("Address"),
    phone: Joi.number().required().min(11).label("Phone Number"),
    addiction: Joi.string().required().label("Condition"),
    password: Joi.string().required().min(6).max(8).label("Password"),
    password2: Joi.string().required().min(6).max(8).label("Password"),
  };

  doSubmit = async () => {
    this.props.register(this.state.data, this.props.history);
  };
  render() {
    return (
      <div>
        <h3 className="center yellow-text">Registration Form</h3>
        <form onSubmit={this.handleSubmit} className="white-text">
          {this.renderInput("fullname", "fullname", "text")}
          {this.renderInput("email", "email", "email")}
          {this.renderInput("address", "address", "text")}
          {this.renderInput("phone", "phone", "number")}
          {this.renderInput("addiction", "addiction", "text")}
          {this.renderInput("password", "password", "password")}
          {this.renderInput("password2", "password2", "password")}
          {this.renderButton("submit")}
        </form>
        <div className=" center-align mt-2 white-text">
        if you have an account <Link className="yellow-text" to='/login'>Login </Link> 
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
}

export default connect(null, {register})(Register);
