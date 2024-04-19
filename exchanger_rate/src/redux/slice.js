import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // api에서 받아온 환율
  rate: {},
  // 초기 지정 날짜
  date: "2022-01-01",
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setRate(state, action) {
      state.rate = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});

export const { setRate, setDate } = exchangeSlice.actions;

export default exchangeSlice.reducer;
