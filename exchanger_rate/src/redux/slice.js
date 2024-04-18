import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rates: {},
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setRates(state, action) {
      state.rates = action.payload;
    },
  },
});

export const { setRates } = exchangeSlice.actions;

export default exchangeSlice.reducer;
