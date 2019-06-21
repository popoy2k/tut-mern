import { GET_ITEMS, GET_ITEMS_ERROR, DELETE_ITEM } from "./types";
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

export const deleteItem = id => dispatch => {
  axios.delete(`api/items/${id}`).then(res => {
    dispatch({
      type: DELETE_ITEM,
      payload: res.data
    });
  });
};
