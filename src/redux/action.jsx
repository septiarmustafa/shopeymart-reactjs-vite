import { addItem, removeItem } from "./cartSlice";

export const addCart = (product) => {
  return (dispatch) => {
    dispatch(addItem(product));
  };
};

export const delCart = (product) => {
  return (dispatch) => {
    dispatch(removeItem(product));
  };
};
