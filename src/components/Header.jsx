import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/features/usersSlice";
import { Link, useLocation } from "react-router-dom";
import LogoutPage from "./LogoutPage";
export default function Header() {
  const location = useLocation();
  console.log(location.pathname);
  function getNaviagtionHistory() {
    const path = location.pathname;
    const arrOfPaths = path.split("/");
    console.log(arrOfPaths);
    let pathSoFar = "";
    return arrOfPaths.slice(1).map((item, index) => {
      pathSoFar = pathSoFar + "/" + item;
      return (
        <Link style={{ marginRight: "10px" }} key={index} to={pathSoFar}>
          {!isNaN(item) ? `Post-${item}` : "Posts"}
        </Link>
      );
    });
  }
  const [userSelected, setUserSelected] = useState("0");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  console.log(users, " users");
  function getUserDropDown() {
    return users.map(({ id, name }) => {
      return (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      );
    });
  }
  function handleChange(e) {
    setUserSelected(e.target.value);
    console.log(userSelected);
    let selectedId = e.target.value;
    let selectedName = "";
    for (let obj of users) {
      if (obj["id"] === selectedId) {
        selectedName = obj["name"];
      }
    }
    dispatch(selectUser({ id: selectedId, name: selectedName }));
  }
  return (
    <Container
      sx={{
        marginTop: "5px",
        marginBottom: "50px",
      }}
    >
      <Grid
        container
        sx={{ flexDirection: "row", alignItems: "center", padding: "50px" }}
      >
        <Grid item>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userSelected}
              label="User"
              onChange={handleChange}
            >
              {getUserDropDown()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }}>
          <LogoutPage />
        </Grid>
      </Grid>
      <Grid container>{getNaviagtionHistory()}</Grid>
    </Container>
  );
}
