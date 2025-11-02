// import { RootState } from './store';

// export const selectTotalItemsInCart = (state: RootState) => {
//   return Object.values(state.cart.items).reduce((total, quantity) => total + quantity, 0);
// };

////////////////

import { RootState } from "./store";

export const selectTotalUniqueItemsInCart = (state: RootState) => {
  return Object.keys(state.cart.items).length;
};
