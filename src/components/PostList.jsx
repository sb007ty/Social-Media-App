import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import apiService from "../service/apiService";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../redux/features/postsSlice";
import { Container, Grid, Paper } from "@mui/material";
import Post from "./Post";
import { setUsers, updateUsers } from "../redux/features/usersSlice";

export default function PostList() {
  const posts = useSelector((state) => state.posts.postsList);
  // console.log(posts);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  async function fetchPostsAndUsers() {
    setLoading(true);
    const resp = await Promise.all([
      apiService.get("/posts"),
      apiService.get("/users"),
    ]);
    // console.log(resp[0]);
    // const resp = await apiService.get("/posts");
    setLoading(false);
    // console.log(resp);
    dispatch(addPosts(resp[0].data));
    dispatch(setUsers(resp[1].data));
  }
  useEffect(() => {
    fetchPostsAndUsers();
  }, []);
  function renderPosts() {
    console.log(posts);
    return posts.map((item) => {
      return <Post {...item} key={item.id} />;
    });
  }
  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <Container>
          <Grid flexDirection={"column"} container gap={"20px"}>
            {renderPosts()}
          </Grid>
        </Container>
      )}
    </>
  );
}
