import React, { useState } from "react";
import IconComp from "./IconComp";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clickIcon, getUserName } from "../utils/commonFunctions";
import {
  Celebration,
  HeartBroken,
  RemoveRedEyeSharp,
  Rocket,
} from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { updatePost } from "../redux/features/postsSlice";
import apiService from "../service/apiService";
export default function PostDetails() {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, " id");
  const postDetails = useSelector((state) => {
    const { postsList } = state.posts;
    for (let obj of postsList) {
      console.log(obj["id"], id);
      if (obj["id"] == id) return obj;
    }
    //Invalid URL
  });
  const { title, content, reactions, userId, date } = postDetails;
  const [reactionsState, setReactionsState] = useState(reactions);
  const user = useSelector((state) => {
    const { usersList } = state.users;
    return getUserName(usersList, userId);
  });
  const selectedUser = useSelector((state) => state.users.selectedUser);

  console.log(postDetails, " postDe", user);
  function startEdit() {
    setEdit(true);
  }
  function clickCancel() {
    setEdit(false);
    setReactionsState(reactions);
  }
  function onSubmit() {
    // console.log(newTitle, desc);
    const editedPost = {
      id,
      title: newTitle,
      content: desc,
      reactions: { ...reactionsState },
      userId: selectedUser["id"],
      date: new Date(),
    };
    dispatch(updatePost(editedPost));
    apiService.put(`/posts/${id}`, editedPost);
    setEdit(false);
  }
  function clickIcon(e, icon, reactionsState, setReactionsState) {
    if (edit)
      setReactionsState({
        ...reactionsState,
        [icon]: reactionsState[icon] + 1,
      });
  }
  return (
    <Container>
      <Paper
        sx={{
          backgroundColor: "whitesmoke",
          border: "2px solid black",
          padding: "50px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">Updated By - {user}</Typography>
        <Typography variant="body1">
          {content.length > 100 ? content.substring(0, 99) : content}
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            ":hover": {
              cursor: "pointer",
            },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconComp>
            {" "}
            <ThumbUpIcon
              sx={{ color: "gold", marginRight: "10px" }}
              id="thumb"
              onClick={(e) => {
                if (edit)
                  clickIcon(e, "thumbsUp", reactionsState, setReactionsState);
              }}
            />
            <Typography variant="body2" component={"span"}>
              {reactionsState.thumbsUp}
            </Typography>
          </IconComp>

          <IconComp>
            {" "}
            <Celebration
              sx={{ color: "blue", marginRight: "10px" }}
              id="celeb"
              onClick={(e) => {
                clickIcon(e, "hooray", reactionsState, setReactionsState);
              }}
            />
            <Typography variant="body2" component={"span"}>
              {reactionsState.hooray}
            </Typography>
          </IconComp>

          <IconComp>
            <HeartBroken
              sx={{ color: "red", marginRight: "10px" }}
              id="heart"
              onClick={(e) => {
                clickIcon(e, "heart", reactionsState, setReactionsState);
              }}
            />
            <Typography variant="body2" component={"span"}>
              {reactionsState.heart}
            </Typography>
          </IconComp>

          <IconComp>
            {" "}
            <Rocket
              sx={{ color: "green", marginRight: "10px" }}
              id="rocket"
              onClick={(e) => {
                clickIcon(e, "rocket", reactionsState, setReactionsState);
              }}
            />
            <Typography variant="body2" component={"span"}>
              {reactionsState.rocket}
            </Typography>
          </IconComp>

          <IconComp>
            <RemoveRedEyeSharp
              sx={{ color: "black", marginRight: "10px" }}
              id="eye"
              onClick={(e) => {
                clickIcon(e, "eyes", reactionsState, setReactionsState);
              }}
            />
            <Typography variant="body2" component={"span"}>
              {reactionsState.eyes}
            </Typography>
          </IconComp>
        </Box>
        {!edit && <Button onClick={startEdit}>Edit</Button>}
      </Paper>
      {edit && (
        <Paper
          elevation={10}
          sx={{ backgroundColor: "beige", marginTop: "50px" }}
        >
          <Grid
            container
            sx={{ flexDirection: "column", alignItems: "center" }}
            gap={"20px"}
          >
            <Grid item sx={{ width: "40%" }}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item sx={{ width: "80%", padding: "20px" }}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Button
                sx={{ marginRight: "5px" }}
                variant="contained"
                onClick={onSubmit}
              >
                Submit
              </Button>
              <Button variant="contained" onClick={clickCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
