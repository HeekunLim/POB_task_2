import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "./slice";

const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
  },
});

export default store;
