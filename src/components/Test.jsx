import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectUser, updateUsers } from "../redux/features/usersSlice";

export default function Test() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      console.log("update");
      //   dispatch(selectUser({ a: 1 }));
      dispatch(updateUsers({ id: 100, name: "bro" }));
    }, 5000);
  }, []);
  return <div>Test</div>;
}
