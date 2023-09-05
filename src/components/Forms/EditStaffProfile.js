import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "../common/Form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { editProfile, getProfileById } from "../../Actions/profile";
import { addAvailability, clearAvailability } from "../../Actions/appointment";
import { loadUser } from "../../Actions/auth";
import { Redirect } from "react-router-dom";
import Loading from "../layouts/Loading";
import axios from "axios";

class EditStaffProfile extends Form {
  state = {
    user: null,
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

  async componentDidMount() {
    try {
      const { data: user } = await this.props.loadUser();
      const profile = await this.props.getProfileById(
        this.props.match.params.id
      );
      await this.setState({
        user: user,
        data: {
          _id: profile._id,
          title: profile.title,
          fullname: profile.fullname,
          specialty: profile.specialty,
          bio: profile.bio,
          gender: profile.gender,
          employer: profile.employer,
          address: profile.address,
          phone: profile.phone,
          email: profile.email,
          fee: profile.fee,
          availableDay: "",
          availableTime: "",
          availability: [],
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({
        errors: err.response.data,
        ...this.state,
      });
    }
  }

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
    fee: Joi.number().required().label("Your Fee"),
    availableDay: Joi.string().label("day"),
    availableTime: Joi.string().label("time"),
  };

  addAvailability = async (e) => {
    e.preventDefault();
    if (this.state.data.availableDay === "") {
      toast.error("Please select a day.");
      return;
    }
    if (this.state.data.availableTime === "") {
      toast.error("Please select a time.");
      return;
    }
    const { availableDay, availableTime } = this.state.data;

    const availability = [
      ...this.state.data.availability,
      { day: availableDay, time: availableTime },
    ];

    await this.setState({ data: { ...this.state.data, availability } });

    this.props.addAvailability(this.state.data.availability);

    toast.info("availability slot added.");
  };

  doSubmit = () => {
    this.props.editProfile(
      this.state.data,
      this.state.data._id,
      this.props.history
    );
    console.log(
      { formData: this.state.data },
      this.state.data._id,
      this.props.history
    );
  };
  render() {
    console.log({ validation: this.validate() });
    const days = [
      "Select Day",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const times = ["Select Time", "Morning", "Afternoon", "Evening"];

    return this.state.user && this.state.user === null ? (
      <p>Loading...</p>
    ) : this.state.user && this.state.user.isStaff === false ? (
      <Redirect to={`/edit-profile/${this.state.data._id}`} />
    ) : (
      <div>
        <Link
          style={{ marginTop: "2rem" }}
          to="#"
          onClick={() => window.history.back()}
          className="btn yellow darken-3"
        >
          Go Back
        </Link>
        <h2 className="center yellow-text">Edit Staff Profile Form</h2>

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
          {this.renderInput("fee", "Enter Service Fee", "number")}
          <h5 className=" center">Update your availability...</h5>
          <p className="yellow-text">Select Day(s) you are available</p>
          {this.renderSelect("availableDay", "Select Available Day", days)}
          <p className="yellow-text">
            Select time(s) for day(s) you are available
          </p>
          {this.renderSelect("availableTime", "Select Available Time", times)}
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => this.addAvailability(e)}
            className="badge yellow darken-3"
          >
            Add Availablity
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => this.props.clearAvailability()}
            className="badge yellow darken-3"
          >
            Reset Availablity
          </span>
          {this.renderButton("Submit", "btn")}
        </form>
      </div>
    );
  }
}

EditStaffProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  addAvailability: PropTypes.func.isRequired,
  clearAvailability: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, {
  editProfile,
  getProfileById,
  addAvailability,
  clearAvailability,
  loadUser,
})(EditStaffProfile);
