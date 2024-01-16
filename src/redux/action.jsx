import { addItem, removeItem, removeCartItem } from "./cartSlice";

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

export const removeItemCart = (product) => {
  return (dispatch) => {
    dispatch(removeCartItem(product));
  };
};
