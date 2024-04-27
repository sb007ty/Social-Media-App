import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/postsSlice";
import usersReducer from "./features/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
export default store;
