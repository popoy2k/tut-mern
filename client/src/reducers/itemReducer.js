import { GET_ITEMS, GET_ITEMS_ERROR } from "../actions/types";

const initialState = {
  items: [],
  item: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_ERROR:
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};
