import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  postsList: [],
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts(state, action) {
      state.postsList = action.payload;
    },
    getPosts(state) {
      return state;
    },
    updatePost(state, action) {
      const { postsList } = state;
      // console.log(action.payload, state);
      // console.log(current(postsList), " state here", action.payload);
      postsList.forEach((post, index) => {
        if (post["id"] === action.payload.id) {
          console.log(current(post), " state here");
          postsList[index] = action.payload;
        }
      });
    },
  },
});
export const { addPosts, getPosts, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
