import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ ...product, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload.id;

      return state.map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });
    },
    removeCartItem: (state, action) => {
      const indexToRemove = action.payload;

      return state.filter((_, index) => index !== indexToRemove);
    },
  },
});

export const { addItem, removeItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
