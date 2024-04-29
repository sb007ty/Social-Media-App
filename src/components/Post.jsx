import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Celebration,
  HeartBroken,
  RemoveRedEyeSharp,
  Rocket,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import IconComp from "./IconComp";
import { updatePostReaction } from "../redux/features/postsSlice";
import { Link, useParams } from "react-router-dom";
import { getUserName } from "../utils/commonFunctions";
export default function Post({ title, content, reactions, id, userId, date }) {
  //   const postDetails = { title, content, reactions, id, userId };
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    const { usersList } = state.users;
    return getUserName(usersList, userId);
  });
  //   console.log("rerender", user);
  function getTime() {
    const currTimeStamp = Date.now();
    const editedDateTimeStamp = new Date(date).getTime();
    let diff = (currTimeStamp - editedDateTimeStamp) / 1000;
    console.log(diff);
    let seconds = diff % 60;
    let minutes = (diff / 60) % 60;
    let hours = (diff / (60 * 60)) % 24;
    let days = diff / (60 * 60 * 24);
    return (
      " (" +
      `${days.toFixed(0)}-days, ${hours.toFixed(0)}-hours, ${minutes.toFixed(
        0
      )}-mins, ${seconds.toFixed(0)}seconds ago)`
    );
  }
  return (
    <Grid item>
      <Paper
        sx={{
          backgroundColor: "whitesmoke",
          border: "2px solid black",
          padding: "50px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">
          Updated By - {user}
          {getTime()}
        </Typography>
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
            />
            <Typography variant="body2" component={"span"}>
              {reactions.thumbsUp}
            </Typography>
          </IconComp>

          <IconComp>
            {" "}
            <Celebration
              sx={{ color: "blue", marginRight: "10px" }}
              id="celeb"
            />
            <Typography variant="body2" component={"span"}>
              {reactions.hooray}
            </Typography>
          </IconComp>

          <IconComp>
            <HeartBroken
              sx={{ color: "red", marginRight: "10px" }}
              id="heart"
            />
            <Typography variant="body2" component={"span"}>
              {reactions.heart}
            </Typography>
          </IconComp>

          <IconComp>
            {" "}
            <Rocket sx={{ color: "green", marginRight: "10px" }} id="rocket" />
            <Typography variant="body2" component={"span"}>
              {reactions.rocket}
            </Typography>
          </IconComp>

          <IconComp>
            <RemoveRedEyeSharp
              sx={{ color: "black", marginRight: "10px" }}
              id="eye"
            />
            <Typography variant="body2" component={"span"}>
              {reactions.eyes}
            </Typography>
          </IconComp>
        </Box>
        <Link to={`${id}`}>Post Details</Link>
      </Paper>
    </Grid>
  );
}
