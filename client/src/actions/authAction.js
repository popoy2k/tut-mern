import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USER_LOADED,
  USER_LOADING,
  CLEAR_ERROR
} from "./types";

import { returnError } from "./errorAction";
import axios from "axios";

export const getConfig = () => getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const authUser = () => dispatch => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", getConfig)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const logoutUser = () => {
  return { type: LOGOUT_SUCCESS };
};

export const registerUser = newUser => dispatch => {
  const { name, email, password } = newUser;
  const config = { headers: { "Content-Type": "application/json" } };
  const body = { name, email, password };

  axios
    .post("/api/user", body, config)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch(err => {
      dispatch(
        returnError(err.response.data.msg, err.response.status, REGISTER_ERROR)
      );
      dispatch({ type: REGISTER_ERROR });
    });
};
