import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USER_LOADED,
  USER_LOADING
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

export const authUser = () => (dispatch, getState) => {
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

// export const loginUser = user => dispatch => {

// };
