import axios from "axios";
import { setHeader } from "../Utils/httpService";
import {
  login_fail,
  login_success,
  register_success,
  register_fail,
  log_out,
  clear_profile,
  user_loaded,
  load_error,
} from "./types";
import { setAlert } from "../Utils/setAlert";

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) setHeader(token);

  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/api/auth`);
    if (!res.data || res.data === undefined) {
      dispatch({
        type: load_error,
      });
    }
    console.log(res);
    dispatch({
      type: user_loaded,
      payload: res.data,
    });
    return res;

  } catch (err) {
    console.log(err);

    dispatch(setAlert("You are not logged in", "danger"));
    dispatch({
      type: load_error,
    });
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/api/auth`, formData);

    if (res) history.replace("/dashboard");

    dispatch({
      type: login_success,
      payload: {
        token: res.data,
      },
    });
    dispatch(loadUser());
    dispatch(setAlert("You Have Been Logged In", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch(setAlert(err.response.data.errors[0].msg, "error"));

    dispatch({
      type: login_fail,
    });
  }
};
export const register = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}http://localhost:3001/api/users`, formData);

    console.log(res);

    if (res) {
      dispatch({
        type: register_success,
        payload: { token: res.data },
      });

      dispatch(loadUser());

      dispatch(setAlert("Registration Successful", "success"));
      history.replace("/dashboard");
    }
  } catch (err) {
    if (err.response.data.errors)
      return err.response.data.errors.map((e) =>
        dispatch(setAlert(e.msg, "error"))
      );

    dispatch(setAlert(err.response.statusText, "error"));
    dispatch({
      type: register_fail,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: clear_profile,
  });
  dispatch({
    type: log_out,
  });
};
