import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        // token: localStorage.getItem("token"),
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", `${action.payload.token}`);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGIN_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_ERROR:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: null,
        isLoading: false
      };
    default:
      return state;
  }
};
