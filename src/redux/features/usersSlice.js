import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersList: [],
  selectedUser: {
    id: "0",
    name: "Tianna Jenkins",
  },
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers(state, action) {
      state.usersList.push(action.payload);
    },
    setUsers(state, action) {
      state.usersList = action.payload;
    },
    getUSers() {},
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});
export const { updateUsers, getUSers, selectUser, setUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
