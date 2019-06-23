import { GET_ITEMS, GET_ITEMS_ERROR, DELETE_ITEM, CREATE_ITEM } from "./types";
import { getConfig } from "./authAction";
import axios from "axios";

export const getItems = () => dispatch => {
  axios
    .get("/api/items")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ITEMS_ERROR
      });
    });
};

export const deleteItem = id => (dispatch, getState) => {
  axios.delete(`api/items/${id}`, getConfig(getState)).then(res => {
    dispatch({
      type: DELETE_ITEM,
      payload: res.data
    });
  });
};

export const createItem = newItem => (dispatch, getState) => {
  axios
    .post("api/items", JSON.stringify(newItem), getConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_ITEM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
