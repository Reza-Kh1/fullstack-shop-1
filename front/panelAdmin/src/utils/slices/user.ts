import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  role: "",
  name: "",
  phone: "",
  isLoggin: false,
};
const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: { payload: { role: string; name: string } }) => {
      if (action.payload?.role === "ADMIN") {
        state.name = action.payload?.name;
        state.isLoggin = true;
        state.role = "ADMIN";
        return;
      }
      if (action.payload?.role === "AUTHOR") {
        state.name = action.payload?.name;
        state.isLoggin = true;
        state.role = "AUTHOR";
        return;
      }
    },
    logOut: (state) => {
      state.isLoggin = false;
      state.name = "";
      state.phone = "";
      state.role = "";
    },
  },
});
export const { loginUser, logOut } = counterSlice.actions;
export default counterSlice.reducer;
