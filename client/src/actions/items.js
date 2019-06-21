import { GET_ITEMS, GET_ITEMS_ERROR } from "./types";
import axios from "axios";

export const getItems = () => dispatch => {
  axios
    .get("/api/items")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data.length === 1 ? [res.data] : res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ITEMS_ERROR,
        payload: { name: err.response.data }
      });
    });
};
