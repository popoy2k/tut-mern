import { GET_ITEMS, GET_ITEMS_ERROR, DELETE_ITEM } from "../actions/types";

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
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
      };
    default:
      return state;
  }
};
