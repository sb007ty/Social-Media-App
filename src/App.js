import logo from "./logo.svg";
import "./App.css";
import PostList from "./components/PostList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectUser } from "./redux/features/usersSlice";
import Test from "./components/Test";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      {/* <Test /> */}
    </div>
  );
}

export default App;
