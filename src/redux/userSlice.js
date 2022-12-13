/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    getUsers: (state, action) => {
      console.log("action", action.payload);
      state.users = [...action.payload];
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.users.map((item, i) => {
        if (item.id === action.payload.id) {
          item.first_name = action.payload.first_name;
          item.last_name = action.payload.last_name;
          item.avatar = action.payload.avatar;
          return item;
        }
        return item;
      });
    },
  },
});

export const { deleteUser, updateUser, getUsers } = userSlice.actions;

export default userSlice.reducer;
