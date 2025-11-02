// // store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// function saveToLocalStorage(state) {
//     try {
//       const serializedState = JSON.stringify(state);
//       localStorage.setItem('state', serializedState);
//     } catch(e) {
//       console.warn(e);
//     }
//   }

//   function loadFromLocalStorage() {
//     try {
//       const serializedState = localStorage.getItem('state');
//       if (serializedState === null) return undefined;
//       return JSON.parse(serializedState);
//     } catch(e) {
//       console.warn(e);
//       return undefined;
//     }
//   }

//   const persistedState = loadFromLocalStorage();

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
//   preloadedState: persistedState,
// });

// store.subscribe(() => saveToLocalStorage(store.getState()));
// export type RootState = ReturnType<typeof store.getState>;

/////////////
// store.ts

import cartReducer from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";

function saveToLocalStorage(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage(): any {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
