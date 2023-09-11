import { configureStore } from "@reduxjs/toolkit";

import cafesReducer from "./cafes";

const store = configureStore({
  reducer: {
    cafes: cafesReducer,
  },
});

export default store;
