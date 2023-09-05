import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/Form";
import Loading from "../layouts/Loading";
import { createProfile } from "../../Actions/profile";
import { loadUser } from "../../Actions/auth";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class CreateStaffProfile extends Form {
  async componentDidMount() {
    const user = await this.props.loadUser();
    this.setState({ user: user.data });
    console.log(user);
  }
  state = {
    user: {},
    data: {
      title: "",
      fullname: "",
      specialty: "",
      bio: "",
      gender: "",
      employer: "",
      address: "",
      phone: "",
      email: "",
      fee: "",
      availableDay: "",
      availableTime: "",
      availability: [],
    },
    errors: {},
  };

  Schema = {
    title: Joi.string().required().label("Professional Title"),
    fullname: Joi.string().required().label("Your Full Name"),
    specialty: Joi.string().required().label("Field of Specialty"),
    bio: Joi.string().required().label("Brief Biography"),
    gender: Joi.string().required().label("Your gender"),
    employer: Joi.string().required().label("Employer"),
    address: Joi.string().required().label("Your Address"),
    phone: Joi.number().required().label("Your Phone Number"),
    email: Joi.string().required().label("Your Email"),
    fee: Joi.string().required().label("Your Fee"),
    availableDay: Joi.string().label("day"),
    availableTime: Joi.string().label("time"),
  };

  days = ["Select Day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  times = ["Select Time", "Morning", "Afternoon", "Evening"];

  addAvailability = async (e) => {
     if (this.state.data.availableDay === "") {
      toast.error("Please select a day.");
      return;
    }
    if (this.state.data.availableTime === "") {
      toast.error("Please select a time.");
      return;
    }
    e.preventDefault();
    const { availableDay, availableTime } = this.state.data;

    const availability = [
      ...this.state.data.availability,
      { day: availableDay, time: availableTime },
    ];
    console.log(availability);
    await this.setState({ data: { ...this.state.data, availability } });

    toast.info("availability slot added.");
  };

  doSubmit = () => {
    console.log({ formData: this.state.data });
    this.props.createProfile(this.state.data, this.props.history);
  };
  render() {
    console.log(this.state.user.isStaff);
    const { user } = this.state;
    if (!user)
      return (
        <div style={{ marginTop: "100px" }}>
          <Loading />
        </div>
      );
    if (user && user.isStaff === false)
      return <Redirect to="/create-profile" />;
    return (
      <div>
        <h2 className="center yellow-text">Create Staff Profile</h2>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          please Caplitalize your title, eg: Doctor, Councellor...
          {this.renderInput("title", "Enter Your Title", "text")}
          {this.renderInput("fullname", "Ful Name", "text")}
          {this.renderInput("gender", "Gender", "text")}
          {this.renderInput("specialty", "field of Specialty", "text")}
          {this.renderInput("bio", "Brief Bio", "text")}
          {this.renderInput("employer", "Employer", "text")}
          {this.renderInput("address", "Enter Your Address", "text")}
          {this.renderInput("email", "Enter Contact Email", "text")}
          {this.renderInput("phone", "Enter Contact Phone", "number")}
          {this.renderInput("fee", "Enter Service Fee", "text")}
          <h5 className=" center">Update your availability...</h5>
          <p className="yellow-text">Select Day(s) you are available</p>
          {this.renderSelect("availableDay", "Select Available Day", this.days)}
          <p className="yellow-text">
            Select time(s) for day(s) you are available
          </p>
          {this.renderSelect(
            "availableTime",
            "Select Available Time",
            this.times
          )}
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => this.addAvailability(e)}
            className="badge yellow darken-3"
          >
            Add Availablity
          </span>
          {this.renderButton("Submit", "btn")}
        </form>
      </div>
    );
  }
}

CreateStaffProfile.defaultProps = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile, loadUser })(
  CreateStaffProfile
);
