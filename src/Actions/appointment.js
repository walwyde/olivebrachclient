import axios from "axios";

import {
  get_appointments,
  get_appointment,
  new_appointment,
  appointment_error,
  delete_appointment,
  update_appointment,
  get_doctors,
  no_doctors,
  load_availability,
  approved_appointment,
} from "./types";

import { setAlert } from "../Utils/setAlert";
import { setHeader } from "../Utils/httpService";

if (localStorage.getItem("token")) {
  setHeader(localStorage.getItem("token"));
}

export const addAvailability = (availability) => async (dispatch) => {
  console.log(availability);
  const config = {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  try {
    const res = await axios.post("/api/appointment/me/availability", {
      availability,
    });

    console.log(res);

    dispatch({
      type: load_availability,
      payload: res.data,
    });
    dispatch(setAlert("Appointment Added", "success"));
  } catch (err) {
    if (err.response.data.errors)
      err.response.data.errors.map((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );

    console.log(err.response);
    dispatch(setAlert("Appointment not added", "danger"));
  }
};
export const clearAvailability = () => async (dispatch) => {
  try {
    const res = await axios.delete("/api/appointment/me/availability");

    dispatch({
      type: load_availability,
      payload: res.data,
    });

    dispatch(setAlert("Availability Cleared", "success"));
  } catch (err) {
    console.log(err);
  }
};
export const getDoctors = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/appointment/doctors");
    console.log(res);

    if (res.status === 404) {
      window.location("/404");
    }

    // if (res.data.errors === 0) {
    //   return dispatch({
    //     type: no_doctors,
    //     payload: res.data.errors.msg,
    //   });
    // }

    dispatch({
      type: get_doctors,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: no_doctors,
      payload: err.response,
    });
  }
};

// Get all appointments

export const getAppointment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/appointment/${id}`);

    console.log(res);
    dispatch({
      type: get_appointment,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const newAppointment = (doctor, time, date) => async (dispatch) => {
  const formData = {
    doctor,
    time,
    date,
  };
  try {
    const res = await axios.post("/api/appointment", formData);

    if (res) {
      dispatch({
        type: new_appointment,
        payload: res.data,
      });
      dispatch(setAlert("Appointment Created", "success"));
    }
  } catch (err) {
    if (err.response.data.errors) {
      err.response.data.errors.map((e) => dispatch(setAlert(e.msg, "danger")));
    }
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status }
    });
    console.log(err.response);
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/appointment/${id}`);

    if (res) {
      dispatch({
        type: delete_appointment,
        payload: id,
      });
    }
  } catch (err) {
    if (err) {
      console.log(err.response);
      err.response.data.errors && err.response.data.errors.map((e) => dispatch(setAlert(e.msg, "danger")));
    }
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const updateAppointment = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/appointment/${id}`, formData);
    dispatch({
      type: update_appointment,
      payload: { id, appointment: res.data },
    });
    dispatch(setAlert("Appointment Updated", "success"));
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const getBookedAppointments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/appointment");

    dispatch({
      type: get_appointments,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: appointment_error,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const approveAppointment = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/appointment/${id}`, {
      _id: id,
    });

    console.log(res.data);

    if (res) {
      dispatch({
        type: approved_appointment,
        payload: res.data,
      });

      dispatch(() => setAlert("Appointment Approved", "success"));
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.map((error) =>
        dispatch(setAlert(error.response.data.error.msg, "danger"))
      );
    }
    dispatch(() => setAlert("OOPS! Something went wrong", "danger"));
  }
};
