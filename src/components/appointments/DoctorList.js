import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAppointment } from "../../Actions/appointment";

const DoctorList = ({ doctors, newAppointment, loading }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [date, setDate] = useState({
    date: "",
  });

  const handleAppointmentBooking = () => {
    if (selectedDoctor && selectedTimeSlot) {
      // Implement your logic to handle appointment booking here
      console.log(
        `Appointment booked for ${selectedDoctor.user.name} at ${selectedTimeSlot} on ${date}`
      );
      newAppointment(selectedDoctor._id, selectedTimeSlot, date);
    }
  };

  return (
    <Fragment>
      {!loading &&
        doctors &&
        doctors.map((doctor) => (
          <div key={doctor._id} className="card center">
            <div className="card-content">
              <div className="card-title">
                <Link to={`profile/${doctor._id}`} className="blue-text">
                  {" "}
                  <h6 className="card-title">
                    {" "}
                    {doctor.title.charAt(0).toUpperCase() +
                      doctor.title.slice(1).toLowerCase()}{" "}
                    {doctor.user.fullname}
                  </h6>
                </Link>
              </div>

              {doctor.availability.length > 0 && (
                <div>
                  <div>
                    <div>Available Time Slots:</div>
                    <ul>
                      {doctor.availability.map((slot) => (
                        <li
                          key={slot._id}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          active={selectedTimeSlot === slot.time}
                          style={
                            selectedTimeSlot === slot.time
                              ? {
                                  backgroundColor: "#01411C",
                                  margin: "0 auto",
                                  width: "75%",
                                  padding: "",
                                  borderRadius: "10px",
                                  border: "2px solid yellow",
                                  color: "yellow",
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                }
                              : {
                                  color: "black",
                                  backgroundColor: "#cdc",
                                  borderRadius: "10px",
                                  border: "2px solid green",
                                  textAlign: "center",
                                }
                          }
                        >
                          {"Slot: "} <span> {slot.day}</span> {"  -->  "}
                          <span>{slot.time}</span>
                        </li>
                      ))}
                    </ul>

                    <div>Propose Date:</div>
                    <div className="input-field">
                      <input
                        type="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                        style={{ cursor: "pointer" }}
                        value={date}
                        id="date"
                      />
                      <label htmlFor="date">Propose Date</label>
                    </div>
                  </div>
                  <div className="card-action">
                    <button
                      className="btn-small"
                      onClick={() => setSelectedDoctor(doctor)}
                      disabled={!selectedTimeSlot}
                    >
                      Select Doctor
                    </button>{" "}
                    {selectedDoctor && (
                      <button
                        className="btn-small"
                        onClick={() => handleAppointmentBooking()}
                      >
                        Book Appointment
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </Fragment>
  );
};

DoctorList.propTypes = {
  // newAppointment: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired,
};

export default connect(null, { newAppointment })(DoctorList);
