import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: { [productId: string]: number };
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  
    addItem: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const currentQuantity = state.items[productId] || 0;
      state.items[productId] = currentQuantity + quantity;
    },

    removeItem: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const currentQuantity = state.items[productId];
      if (currentQuantity) {
        const newQuantity = currentQuantity - quantity;
        if (newQuantity > 0) {
          state.items[productId] = newQuantity;
        } else {
          delete state.items[productId];
        }
      }
    },
    deleteItem: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      delete state.items[productId];
    },
  //
  clearCart: (state) => {
    state.items = {}; 
  },
  //
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

////////////////


