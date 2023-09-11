import { createSlice } from "@reduxjs/toolkit";

const initialCafesState = {
  data: [],
};

const cafesSlice = createSlice({
  name: "cafes",
  initialState: initialCafesState,
  reducers: {
    // getCafes(state) {
    //   state.data;
    // },
    setCafes(state, action) {
      state.data = action.payload;
    },
  },
});
export const cafesActions = cafesSlice.actions;

export default cafesSlice.reducer;
